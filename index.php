<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Card Menu</title>
    <link rel="stylesheet" href="styles.css">
</head>

<body>
    <div class="container">
        <?php
        $json = file_get_contents('cards.json');
        $cards = json_decode($json, true);

        if ($cards) {
            foreach ($cards as $card) {
                echo '<div class="card">';
                echo '<a href="card.php?id=' . $card['id'] . '">';
                echo '<img src="' . $card['image'] . '" alt="' . $card['name'] . '">';
                echo '<p>' . $card['name'] . '</p>';
                echo '</a>';
                echo '</div>';
                // Log the link generated
                error_log('Link generated: card.php?id=' . $card['id']);
            }
        } else {
            echo '<p>No cards found.</p>';
        }
        ?>
    </div>
</body>

</html>