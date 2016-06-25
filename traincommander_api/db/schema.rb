# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160625181054) do

  create_table "orders", force: :cascade do |t|
    t.integer  "trip_id"
    t.integer  "user_id"
    t.datetime "order_time"
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
    t.string   "transaction_id"
    t.boolean  "processed",      default: false
    t.index ["trip_id"], name: "index_orders_on_trip_id"
    t.index ["user_id"], name: "index_orders_on_user_id"
  end

  create_table "stations", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "trains", force: :cascade do |t|
    t.string   "name"
    t.integer  "capacity"
    t.string   "city"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "trips", force: :cascade do |t|
    t.datetime "departure_time"
    t.integer  "total_travel_time"
    t.float    "price"
    t.integer  "train_id"
    t.integer  "from_id"
    t.integer  "to_id"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.index ["from_id"], name: "index_trips_on_from_id"
    t.index ["to_id"], name: "index_trips_on_to_id"
    t.index ["train_id"], name: "index_trips_on_train_id"
  end

  create_table "users", force: :cascade do |t|
    t.string   "email"
    t.string   "password_digest"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "name"
    t.string   "sub"
  end

end
