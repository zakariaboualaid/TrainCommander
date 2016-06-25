class OrdersController < ApplicationController
  before_action :set_order, only: [:show, :update, :destroy]
  skip_before_action :authenticate_request
  # GET /orders
  def index
    if params["user_email"]
      @user = User.find_by_email params["user_email"]
      @orders = @user.orders
    else
      @orders = Order.all
    end
    render json: @orders
  end

  # GET /orders/1
  def show
    render json: @order
  end

  # POST /orders
  def create
    @order = Order.find_by_transaction_id(params["transaction_id"]) || Order.new

    if !@order.processed
      @user = User.find_by_email(params["email"])
      @order.order_time = DateTime.now
      @order.user = @user
      @order.transaction_id = params["transaction_id"]
      @order.trip_id = params["trip_id"]
      @order.processed = true

      if @order.save
        @trip = @order.trip
        render json: @order, status: :created, location: @order
      else
        render json: @order.errors, status: :unprocessable_entity
      end
    else
      render json: @order
    end
  end

  # PATCH/PUT /orders/1
  def update
    if @order.update(order_params)
      render json: @order
    else
      render json: @order.errors, status: :unprocessable_entity
    end
  end

  # DELETE /orders/1
  def destroy
    @order.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_order
      @order = Order.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def order_params
      params.require(:order).permit(:trip_id, :email, :user)
    end
end
