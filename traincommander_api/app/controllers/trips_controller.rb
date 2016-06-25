class TripsController < ApplicationController
  before_action :set_trip, only: [:show, :update, :destroy]
  skip_before_action :authenticate_request

  # GET /trips
  def index
    if params["from"] and params["to"]
      date = params["date"].to_date.strftime("%Y-%m-%d")
      between = params["between"].to_time.strftime("%T")
      aand = params["and"].to_time.strftime("%T")
      @trips = Trip.where("DATE(departure_time) = ? and from_id = ? and to_id = ? and TIME(departure_time) between ? and ?", date, params["from"], params["to"], between, aand)
    else
      @trips = Trip.all
    end

    render json: @trips
  end

  # GET /trips/1
  def show
    render json: @trip
  end

  # POST /trips
  def create
    @trip = Trip.new(trip_params)

    if @trip.save
      render json: @trip, status: :created, location: @trip
    else
      render json: @trip.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /trips/1
  def update
    if @trip.update(trip_params)
      render json: @trip
    else
      render json: @trip.errors, status: :unprocessable_entity
    end
  end

  # DELETE /trips/1
  def destroy
    @trip.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_trip
      @trip = Trip.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def trip_params
      params.require(:trip).permit(:departure_time, :total_travel_time, :price, :train_id)
    end
end
