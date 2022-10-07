## credit-app
Credit app that requires wallet functionality. User has a wallet to receive loans they have been granted and also send the money for repayments; Using Node.js, Express and MongoDB.

### Requirements

 - [Node v7.6+](https://nodejs.org/en/download/current/)
 - [NPM](https://yarnpkg.com/en/docs/install)

### Getting Started

Clone the repo:

```bash
git clone https://github.com/adetoyebamise/credit-app.git
cd credit-app
```
Install npm:

```bash
npm install
```

Install dependencies:

```bash
npm install ...
```

Set environment variables:

```bash
cp .env.example .env
```

### Running Locally

```bash
node index
```

### API Endpoint
https://credit-app.herokuapp.com/

### API Postman Collection for Testing
https://www.getpostman.com/collections/7dd089bcd961b9f634e4

### Testing Locally...

### DB Diagram
https://dbdiagram.io/d/63404ff1f0018a1c5fba6880

#### First you need to Create a Customer
```bash
curl -X POST \
  http://localhost:5000/api/v1/user/register \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -H 'postman-token: 030c9874-23c0-367b-7e2b-aea506e851c4' \
  -d 'email=jhon_doe%40gmail.com&password=123456&name=Jhon%20Doe'
```

#### Login
```bash
curl -X POST \
  http://localhost:5000/api/v1/user/login \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -H 'postman-token: b309972f-4942-d788-30a0-df86f4f1b854' \
  -d 'email=jhon_doe%40gmail.com&password=123456'
```

#### Make a Deposit to your eWallet
```bash
curl -X POST \
  http://localhost:5000/api/v1/user/ewallet/deposit \
  -H 'authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MDc3NDM4MTgsImlhdCI6MTUwNzc0MjkxOCwic3ViIjoiNTlkZTUzZDVhYzM5ZmQ1ODQ3MGRjODI4In0.mUry4SFaWRqRrBmNF1RBBnJMvcvJBYAktqczpMj8r2w' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -H 'postman-token: 66218aae-19ee-3761-e0c0-53823d0d4820' \
  -d 'amount=10'
```

#### Make a Transfer to another eWallet
```bash
curl -X POST \
  http://localhost:5000/api/v1/user/ewallet/transfer \
  -H 'authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MDc3NjYyOTgsImlhdCI6MTUwNzc2NTM5OCwic3ViIjoiNTlkZWE4ZDA2YzkyYmQ2ZTdkZjZiMzMwIn0.PGSdiEpPG43ihnJldKFY-MMqNzaGb4PwOylUbA05AVY' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -H 'postman-token: 78116228-4061-257a-f47c-37033d474596' \
  -d 'amount=100&destinationAccountNumber=1001'
```


#### Triggers a Withdrawal from your eWallet
```bash
curl -X POST \
  http://localhost:5000/api/v1/user/ewallet/withdrawal \
  -H 'authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MDc3NzI5NjAsImlhdCI6MTUwNzc3MjA2MCwic3ViIjoiNTlkZWE4ZDA2YzkyYmQ2ZTdkZjZiMzMwIn0.SF8OdwKfT-fiWbkhUgnTKWfyeZCY_p3ek4j2dPVukuc' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -H 'postman-token: d2292d62-cefd-e7b9-311a-12fe92795c79' \
  -d 'amount=1500'
```
