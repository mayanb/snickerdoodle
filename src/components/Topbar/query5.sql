SELECT count(DISTINCT User.user_id) FROM User JOIN Item ON User.user_id = Item.seller_id WHERE User.rating > 1000;
