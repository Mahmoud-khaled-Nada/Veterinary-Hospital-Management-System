![Screenshot_11-6-2024_232750_localhost](https://github.com/Mahmoud-khaled-Nada/Veterinary-Hospital-Management-System/assets/125180279/464a5dc9-4fc0-4a40-ba75-09d15389e110)
![Screenshot_11-6-2024_232933_localhost](https://github.com/Mahmoud-khaled-Nada/Veterinary-Hospital-Management-System/assets/125180279/28cd3925-680d-4aff-80b4-4c7cd1184589)
![Screenshot_11-6-2024_232959_localhost](https://github.com/Mahmoud-khaled-Nada/Veterinary-Hospital-Management-System/assets/125180279/afb50c21-1093-48f1-a307-1683f6a11789)
![Screenshot_11-6-2024_233039_localhost](https://github.com/Mahmoud-khaled-Nada/Veterinary-Hospital-Management-System/assets/125180279/bd7ef070-28a8-467f-a939-408f783ab018)

stap how to install veterinary-hospital app
1: git clone git@github.com:Mahmoud-khaled-Nada/veterinary-hospital.git
2: cd client 
3: npm install 
4: npm run dev
5: cd ..
** server **
1: cd server 
2: composer install
3: php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
4: php artisan jwt:secret
5: create new database
6: config server with your database on file .env
7: php artisan migrate
8: php artisan server
