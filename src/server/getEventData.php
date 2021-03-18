<?php
    ini_set("error_reporting",E_ALL);
	ini_set("log_errors","1");
	ini_set("error_log","php_errors.txt");
    
    require_once('dbconnect.php'); // home database, change when at school
    
    function prepare_Query($request_method, $query) {
        if (isset($request_method) && !empty($request_method)) {
            foreach ($request_method as $key => $column)
            {
                if ($key != 'id')
                    $query = $query." WHERE ".$key."="."'" .$column."'";
                else
                    $query = $query;
                break;
            }
        }
        return $query;
    }

    $default_query = "SELECT * FROM events";        // default query, will retrieve all entries
    $count_query = "SELECT COUNT(*) FROM events";   // queries the number of rows in database
    $update_tagged_query = "";                      // query to update the tagged column in database              
    $request_query = "";                            // request created to send to database

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {

        /**
         * prepares query to update event to tag
         */
        if (!empty($_POST['isTagged'])) {

            switch ($_POST['isTagged']) {
                case 'true':
                    $update_tagged_query = "UPDATE events SET tagged=1 WHERE id="."'".$_POST['id']."'";
                    break;
                case 'false':
                    $update_tagged_query = "UPDATE events SET tagged=0 WHERE id="."'".$_POST['id']."'";
                    break;
            }

            $stmt = $con->prepare($update_tagged_query);
            $stmt->execute();   // send query to the database
        } 

        $request_query = prepare_Query($_POST, $default_query);
        $count_query = prepare_Query($_POST, $count_query);

    } else if (($_SERVER['REQUEST_METHOD'] === 'GET')) {

        $request_query = prepare_Query($_GET, $default_query);
        $count_query = prepare_Query($_GET, $count_query);
    }

    // send count query to db
    $count_stmt = $con->prepare($count_query);
    $count_stmt->execute();

    $result = $con->query($request_query); // get result of query from database
    if (!$con) {
        die('Oops, could not connect: ' . mysql_error());
      }


    /**
     * prepares HTML response to send back to the client
     */
    if ($count_stmt->fetchColumn() > 0) {
        echo "<tbody>";
        while($row = $result->fetch()) {

            $star_icon = ($row['tagged'] == 1) ? "<i class='fa fa-star fav-star'></i>" : ""; 
            $cost_str = ($row['cost'] == 0) ? "FREE" : "$".$row['cost'].".00";
            $disabled_attrb = ($row['tagged'] == 1) ? "disabled" : "";
            $already_tagged = ($row['tagged'] == 1) ? "<p>You've already tagged this event!</p>" : "<p>Add this event to your favourties!</p>"; 
            $untagged_btn = ($row['tagged'] == 1) ? "<span class='category-icon remove' onClick='setTagged(".$row['id'].", false)'>&times;</span>" : "";
            $category_icon = "";

            // generate icon representing category
            switch($row['category']) {
                case 'Craft':
                    $category_icon = "<i class='fa fa-pencil-alt'></i>";
                    break;
                case 'Educational':
                    $category_icon = "<i class='fa fa-graduation-cap'></i>";
                    break;
                case 'Entertainment':
                    $category_icon = "<i class='fa fa-film'></i>";
                    break;
                case 'Shopping':
                    $category_icon = "<i class='fa fa-shopping-cart'></i>";
                    break;
                case 'Sport':
                    $category_icon = "<i class='fa fa-futbol'></i>";
                    break;
            }

                echo "<tr>";
                    echo "<td>";
                        echo "<span class='event-item ".$row['category']."' onCLick='openModal(".$row['id'].")'>".$row['name']." ".$star_icon."</span>";
                    echo "</td>";
                    echo "<td>";
                        // display icon in place of category name
                        echo "<span class='category-icon ".$row['category']."' onClick='filterEvents('category')'>".$category_icon."</span>";
                    echo "</td>";
                    echo "<td>";
                        echo $untagged_btn;
                    echo "</td>";

                    // HTML for modal, displaying full infomation about the event
                    echo "<td>";
                        echo "<div id=".$row['id']." class='modal'>";
                            echo "<div class='modal-content'>";
                                echo "<span id='".$row['id']."-close' class='close'>&times;</span>";
                                echo"<h1>".strtoupper($row['name'])."</h1>";
                                echo "<table>";
                                    echo "<tr>";
                                        echo "<th>Category</th>";
                                        echo "<td>".$row['category']."</td>";
                                    echo "</tr>";
                                    echo "<tr>";
                                        echo "<th>When</th>";
                                        echo "<td>".$row['month'].", ".$row['day']." ".date("g:i a", strtotime($row['time']))."</td>";
                                    echo "</tr>"; 
                                    echo "<tr>";
                                        echo "<th>Cost</th>";
                                        echo "<td>".$cost_str."</td>";
                                    echo "</tr>";
                                    echo "<tr>";
                                        echo "<th>Location</th>";
                                        echo "<td>".$row['location']."</td>";
                                    echo "</tr>";
                                echo "</table>";
                                echo $already_tagged;

                                echo "<button class='btn tagbtn' onClick='setTagged(".$row['id'].", true)'".$disabled_attrb."><i class='fa fa-star'></i></button>";
                            echo "</div>";
                        echo "</div>";
                    echo "</td>";
                echo "</tr>";
        }
        echo "</tbody>";
    } else {
        echo "<div class='no-events-text'>";
            echo "<p>Oh no! Looks like there are no events to show :(</p>";
            echo "<p>Make sure to browse our wide selection of events and choose your favourites!</p>";
        echo "</div>";
    }