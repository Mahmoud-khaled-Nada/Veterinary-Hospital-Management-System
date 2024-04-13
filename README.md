stap how to install veterinary-hospital app
1: git clone git@github.com:Mahmoud-khaled-Nada/veterinary-hospital.git
2: cd client 
3: npm install 
4: npm run dev
** server **
1: cd server 
2: composer install
3: php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
4: php artisan jwt:secret
5: create new database
6: config server with your database
7: php artisan migrate
8: php artisan server
