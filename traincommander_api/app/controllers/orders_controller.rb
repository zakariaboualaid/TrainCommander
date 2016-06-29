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
    @order = Order.new
    @user = User.find_by_email(params["email"])
    @order.user = @user if @user
    @order.order_time = DateTime.now
    @order.trip_id = params["trip_id"]
    @order.processed = false

    if @order.save
      @trip = @order.trip
      render json: @order, status: :created, location: @order
    else
      render json: @order.errors, status: :unprocessable_entity
    end
  end

  def confirm
    if params["order_id"] and params["transaction_id"]
      @order = Order.find(params["order_id"])
      logger.info "HEEEREEE !!"
      logger.info @order.inspect
      if @order and !@order.processed
        @order.transaction_id = params["transaction_id"]
        @order.processed = true
        logger.info "Saved Order"
        if @order.save
          # Sending mail
          logger.info "Params : #{params["email"].inspect}"
          @user = User.find_by_email(params["email"])
          logger.info "User : #{@user}"
          logger.info "Sending email" if @user
          UserMailer.confirmation_pdf(@user).deliver if @user

          @trip = @order.trip
          render json: @order, status: :created, location: @order
        else
          render json: @order.errors, status: :unprocessable_entity
        end
      end

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
