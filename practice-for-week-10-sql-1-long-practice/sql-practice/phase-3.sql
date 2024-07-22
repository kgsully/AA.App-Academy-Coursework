-- Your code here

-- Perform a .read for phase-2.sql to create db tables
.read phase-2.sql

-- 1. A new customer joined the loyalty program: Rachel / phone # 111-111-1111
    INSERT INTO customers (name, phone)
    VALUES
        ('Rachel', 1111111111);

-- 2. Rachel purchases a coffee
    -- UPDATE points
    UPDATE customers
    SET points = points + 1
        WHERE name = 'Rachel' AND phone = 1111111111;

    -- create coffee order
    INSERT INTO coffee_orders DEFAULT
    VALUES;

-- 3. Two new customers joined the loyalty program
    INSERT INTO customers (name, phone, email)
    VALUES
        ('Monica', 2222222222, 'monica@friends.show'),
        ('Phoebe', 3333333333, 'phoebe@friends.show');

-- 4. Phoebe purchases 3 coffees

    INSERT INTO coffee_orders DEFAULT
    VALUES;

    INSERT INTO coffee_orders DEFAULT
    VALUES;

    INSERT INTO coffee_orders DEFAULT
    VALUES;

    UPDATE customers
        SET points = points + 3
        WHERE name = 'Phoebe' AND phone = 3333333333;

-- 5. Rachel and Monica each purchase 4 coffees
    -- Rachel's purchases
    INSERT INTO coffee_orders DEFAULT
    VALUES;

    INSERT INTO coffee_orders DEFAULT
    VALUES;

    INSERT INTO coffee_orders DEFAULT
    VALUES;

    INSERT INTO coffee_orders DEFAULT
    VALUES;

    UPDATE customers
        SET points = points + 4
        WHERE name = 'Rachel' AND phone = 1111111111;

    -- Monica's Purchases
    INSERT INTO coffee_orders DEFAULT
    VALUES;

    INSERT INTO coffee_orders DEFAULT
    VALUES;

    INSERT INTO coffee_orders DEFAULT
    VALUES;

    INSERT INTO coffee_orders DEFAULT
    VALUES;

    UPDATE customers
        SET points = points + 4
        WHERE name = 'Monica' AND phone = 2222222222;

-- 6. Monica wants to know her point total
    SELECT points FROM customers
        WHERE name = 'Monica' AND phone = 2222222222;

-- 7. Rachel wants to check her total points. Redeem her points for a coffee if she has enough points.
--    If she doesn't, she wants to purchase a coffee.

    INSERT INTO coffee_orders (is_redeemed)
    VALUES (
        CASE
        WHEN (SELECT points FROM customers
                WHERE name = 'Rachel' AND phone = 1111111111) >= 10
        THEN 1
        ELSE 0
        END
    );

    UPDATE customers
    SET points =
        CASE
        WHEN (SELECT points from customers
                WHERE name = 'Rachel' AND phone = 1111111111) >= 10
            THEN points - 10
            ELSE points + 1
        END
    WHERE name = 'Rachel' and phone = 1111111111;

-- 8. Three new customers joined the loyalty program
    INSERT INTO customers (name, email)
        VALUES ('Joey', 'joey@friends.show'),
               ('Chandler', 'chandler@friends.show'),
               ('Ross', 'ross@friends.show');

-- 9. Ross Purchases 6 coffees
    INSERT INTO coffee_orders DEFAULT
    VALUES;

    INSERT INTO coffee_orders DEFAULT
    VALUES;

    INSERT INTO coffee_orders DEFAULT
    VALUES;

    INSERT INTO coffee_orders DEFAULT
    VALUES;

    INSERT INTO coffee_orders DEFAULT   -- order #18
    VALUES;

    INSERT INTO coffee_orders DEFAULT   -- order #19
    VALUES;

    UPDATE customers
        SET points = points + 6
        WHERE name = 'Ross' AND email = 'ross@friends.show';

-- 10. Monica Purchases 3 coffees
    INSERT INTO coffee_orders DEFAULT
    VALUES;

    INSERT INTO coffee_orders DEFAULT
    VALUES;

    INSERT INTO coffee_orders DEFAULT
    VALUES;

    UPDATE customers
        SET points = points + 3
        WHERE name = 'Monica' AND phone = 2222222222;

-- 11. Phoebe wants to check her total points. Redeem her points for a coffee if she has enough points.
--     If she doesn't, she wants to purchase a coffee.

    INSERT INTO coffee_orders (is_redeemed)
    VALUES (
        CASE
        WHEN (SELECT points FROM customers
                WHERE name = 'Phoebe' AND phone = 3333333333) >= 10
            THEN 1
            ELSE 0
        END
    );

    UPDATE customers
        SET points = (
            CASE
            WHEN (SELECT points FROM customers
                    WHERE name = 'Phoebe' AND phone = 3333333333) >= 10
                THEN points - 10
                ELSE points + 1
            END
        )
        WHERE name = 'Phoebe' AND phone = 3333333333;

-- 12. Ross demands a refund for the last two coffees that he ordered. (Make sure you delete Ross's coffee orders and not anyone else's.
--     Update his points to reflect the returned purchases.)

    DELETE FROM coffee_orders
        WHERE id = 18 OR id = 19;

    UPDATE customers
        SET points = points - 2
        WHERE name = 'Ross' AND email = 'ross@friends.show';

-- 13. Joey purchases 2 coffees

    INSERT INTO coffee_orders DEFAULT
    VALUES;

    INSERT INTO coffee_orders DEFAULT
    VALUES;

    UPDATE customers
        SET points = points + 2
        WHERE name = 'Joey' AND email = 'joey@friends.show';

-- 14. Monica wants to check her total points. Redeem her points for a coffee if she has enough points.
--     If she doesn't, she wants to purchase a coffee.

    INSERT INTO coffee_orders (is_redeemed)
    VALUES (
        CASE
        WHEN (SELECT points FROM customers
                WHERE name = 'Monica' AND phone = 2222222222) >= 10
            THEN 1
            ELSE 0
        END
    );

    UPDATE customers
    SET points = (
        CASE
        WHEN (SELECT points FROM customers
                WHERE name = 'Monica' AND phone = 2222222222) >= 10
            THEN points - 10
            ELSE points + 1
        END
    )
    WHERE name = 'Monica' AND phone = 2222222222;

-- 15. Chandler wants to delete his loyalty program account.

    DELETE FROM customers
        WHERE name = 'Chandler' AND email = 'chandler@friends.show';

-- 16. Ross wants to check his total points. Redeem his points for a coffee if he has enough points.
--     If he doesn't, he wants to purchase a coffee.

    INSERT INTO coffee_orders (is_redeemed)
    VALUES (
        CASE
        WHEN (SELECT points FROM customers
                WHERE name = 'Ross' AND email = 'ross@friends.show') >= 10
            THEN 1
            ELSE 0
        END
    );

    UPDATE customers
    SET points = (
        CASE
        WHEN (SELECT points FROM customers
                WHERE name = 'Ross' AND email = 'ross@friends.show') >= 10
            THEN points - 10
            ELSE points + 1
        END
    )
    WHERE name = 'Ross' AND email = 'ross@friends.show';

-- 17. Joey wants to check his total points. Redeem his points for a coffee if he has enough points.
--     If he doesn't, he wants to purchase a coffee.

    INSERT INTO coffee_orders (is_redeemed)
    VALUES (
        CASE
        WHEN (SELECT points FROM customers
                WHERE name = 'Joey' AND email = 'joey@friends.show') >= 10
            THEN 1
            ELSE 0
        END
    );

    UPDATE customers
    SET points = (
        CASE
        WHEN (SELECT points FROM customers
                WHERE name = 'Joey' AND email = 'joey@friends.show') >= 10
            THEN points - 10
            ELSE points + 1
        END
    )
    WHERE name = 'Joey' AND email = 'joey@friends.show';

-- 18. Phoebe wants to change her email to p_as_in_phoebe@friends.show

    UPDATE customers
    SET email = 'p_as_in_phoebe@friends.show'
    WHERE name = 'Phoebe' AND phone = 3333333333;
