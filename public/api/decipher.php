<?php
    // CORS Enabled
    header("Access-Control-Allow-Origin: *");

    // Main variables:
    $originalText = isset($_GET['text']) ? $_GET['text'] : ''; // from params
    $pivotFounded = NULL;
    $decipheredTextFounded = '';
    $wordList = array ('the', 'be', 'to', 'of', 'and', 'a', 'in', 
          'that', 'have', 'I', 'it', 'for', 'not', 'on', 'with', 'he', 
          'as', 'you', 'do', 'at');

    // ASCCI 32 - 126,
    function decipherTextForPivot($text, $pivot) {
        $lowerAsciiLimit = 32;
        $upperAsciiLimit = 126;
        $newText = '';
        
        for ($i=0; $i < strlen($text); $i++) {
            if ($text[$i] != "\n") {
                $charOnAscii = ord($text[$i]);
                $newPosition = $charOnAscii + $pivot;
                if($newPosition > $upperAsciiLimit) {
                    $newPosition = $lowerAsciiLimit + ($newPosition % $upperAsciiLimit);
                }
                $newText .= chr($newPosition);
            } else {
                $newText .= "\n";
            }
            
        }
        return $newText;
    }

    function getFrecuencyForWordList($text,  $wordList) {
        $cleaned_text = preg_replace("/[^A-Za-z]/", ' ', $text);
        $counter = 0;
        for ($i=0; $i<count($wordList); $i++) {
            $counter += substr_count(' '. $cleaned_text . ' ', ' ' . $wordList[$i] . ' ');
        }
        return $counter;
    }

    // iterate decoding for every pivot and couting the frecuencies:
    $frecuencies = array();
    $decodedStrings = array();
    for ($pivot = 1; $pivot <= 25; $pivot++) {
        $frecuencies[$pivot] = 0;
        $decipheredText = decipherTextForPivot($originalText, $pivot);
        $frecuencies[$pivot] = getFrecuencyForWordList($decipheredText, $wordList);
        $decodedStrings[$pivot] = $decipheredText;
    }

    // calculate the winner with the max frecuency.
    $maxIndices = array_keys($frecuencies, max($frecuencies)); // get the most.
    if (count($maxIndices == 1)) { // one winner
        $pivotFounded = $maxIndices[0];
        $decipheredTextFounded = $decodedStrings[$pivotFounded];
    } else { // what it's the correct answer?  for now, the lower pivot.
        $pivotFounded = min($maxIndices);
        $decipheredTextFounded = $decodedStrings[$pivotFounded];
    }

    // return the result to the client
    http_response_code(200);
    if ($pivotFounded != NULL) {
        echo json_encode(
            array(
                "success" => true,
                "pivot" => chr($pivotFounded + 64),
                "decipheredText" => $decipheredTextFounded,
                "originalText" => $originalText
            )
        );
    } else {
        echo json_encode(
            array(
                "success" => false,
                "originalText" => $originalText
            )
        );
    }
    
?>