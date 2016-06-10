require 'test_helper'

class StationsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @station = stations(:one)
  end

  test "should get index" do
    get stations_url
    assert_response :success
  end

  test "should create station" do
    assert_difference('Station.count') do
      post stations_url, params: { station: { name: @station.name } }
    end

    assert_response 201
  end

  test "should show station" do
    get station_url(@station)
    assert_response :success
  end

  test "should update station" do
    patch station_url(@station), params: { station: { name: @station.name } }
    assert_response 200
  end

  test "should destroy station" do
    assert_difference('Station.count', -1) do
      delete station_url(@station)
    end

    assert_response 204
  end
end
