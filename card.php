<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chevalier d'Or</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <div class="card-detail">
            <?php
            $json = file_get_contents('cards.json');
            $cards = json_decode($json, true);
            $card = null;

            $id = isset($_GET['id']) ? intval($_GET['id']) : 1;
            foreach ($cards as $c) {
                if ($c['id'] == $id) {
                    $card = $c;
                    break;
                }
            }

            if ($card) {
                echo '<img src="' . $card['image'] . '" alt="' . $card['name'] . '">';
                echo '<div>';
                echo '<h1>' . $card['name'] . '</h1>';
                echo '<p>Class: ' . $card['class'] . '</p>';
                echo '<p>SSO: ' . $card['sso'] . '</p>';
                echo '<img src="' . $card['imagesso2'] . '" alt="' . $card['name'] . ' SSO">';
                echo '<p>Title: ' . $card['title'] . '</p>';
                if (isset($card['mythology'])) echo '<p class="animate-text">Histoire: ' . $card['mythology'] . '</p>';
                for ($i = 1; $i <= 8; $i++) {
                    $mythologyKey = 'mythology' . $i;
                    if (isset($card[$mythologyKey])) {
                        echo '<p class="animate-text">' . $card[$mythologyKey] . '</p>';
                    }
                }
                echo '<button class="btn-add-event--register"><a href="#">Choisir ce rôle</a></button>';
                echo '</div>';
            } else {
                echo '<p>Card not found.</p>';
            }
            ?>
        </div>
    </div>
    <script src="js/scripts.js"></script>
</body>
</html>