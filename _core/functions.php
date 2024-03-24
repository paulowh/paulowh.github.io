<?php
function publicPath($path = '')
{
    $path = str_replace(':80', '', $path);
    $public_path = substr('../', 0, -1);
    return $public_path . $path;
}