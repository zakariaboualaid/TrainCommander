require 'test_helper'

class TrainsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @train = trains(:one)
  end

  test "should get index" do
    get trains_url
    assert_response :success
  end

  test "should create train" do
    assert_difference('Train.count') do
      post trains_url, params: { train: {  } }
    end

    assert_response 201
  end

  test "should show train" do
    get train_url(@train)
    assert_response :success
  end

  test "should update train" do
    patch train_url(@train), params: { train: {  } }
    assert_response 200
  end

  test "should destroy train" do
    assert_difference('Train.count', -1) do
      delete train_url(@train)
    end

    assert_response 204
  end
end
