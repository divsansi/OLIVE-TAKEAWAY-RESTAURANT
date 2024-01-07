db = db.getSiblingDB("Buona");

db.initcollection.insert([
    { name: "Document 1" },
    { name: "Document 2" },
    { name: "Document 3" },
]);

db.createUser({
    user: "dbuser",
    pwd: "dbuserpass",
    roles: [{ role: "readWrite", db: "Buona" }],
});
