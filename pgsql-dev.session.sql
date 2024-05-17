DELETE FROM "_prisma_migrations"
WHERE "id" = 'c1f64d7f-db02-4d59-af03-76b59232977f';
INSERT INTO Profile (id, role, firstName, lastName, mobile, email)
VALUES (
        'id:uuid',
        'role:ADMIN',
        'firstName:Fathima',
        'lastName:Sayeeda',
        'mobile:8138856504',
        'email:sayeeda.61911@gmail.com'
    );