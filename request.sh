echo "Testing error"
curl -X POST http://localhost:3333/user -H 'Content-Type: application/json' -d '{"name": "Natan", "email": "test@test.com", "password": ""}'