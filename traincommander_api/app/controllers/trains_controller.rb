class TrainsController < ApplicationController
  before_action :set_train, only: [:show, :update, :destroy]

  # GET /trains
  def index
    @trains = Train.all

    render json: @trains
  end

  # GET /trains/1
  def show
    render json: @train
  end

  # POST /trains
  def create
    @train = Train.new(train_params)

    if @train.save
      render json: @train, status: :created, location: @train
    else
      render json: @train.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /trains/1
  def update
    if @train.update(train_params)
      render json: @train
    else
      render json: @train.errors, status: :unprocessable_entity
    end
  end

  # DELETE /trains/1
  def destroy
    @train.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_train
      @train = Train.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def train_params
      params.fetch(:train, {})
    end
end
