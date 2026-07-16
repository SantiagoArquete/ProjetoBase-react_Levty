<!-- Para criar o banco de dados -->
psql -U postgres -f backend/migration.sql

<!-- Para iniciar o projeto -->
npm start