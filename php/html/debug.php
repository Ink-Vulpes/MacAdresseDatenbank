<?php
if (getenv("APP_ENV") == "development") {
   echo xdebug_info();
}