echo "Testing error"
curl -X POST http://localhost:3333/user -H 'Content-Type: application/json' -d '{"name": "Natan", "email": "test@test.com", "password": ""}'

echo "\n\n"

echo "Testing route /user method post"
curl -X POST http://localhost:3333/user -H 'Content-Type: application/json' -d '{"name": "Natan", "email": "test@test.com", "password": "test"}'

echo "\n\n"

echo "Testing route /user method get"
curl http://localhost:3333/user