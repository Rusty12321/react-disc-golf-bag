DROP TABLE IF EXISTS disc;

CREATE TABLE disc (
    id serial primary key,
    name varchar,
    type_of_plastic varchar,
    type_of_disc varchar,
    weight_in_grams float,
    color varchar,
    speed float,
    glide float,
    turn float,
    fade float,
    bag_or_storage varchar,
    company_name varchar
)