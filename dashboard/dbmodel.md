// Use DBML to define your database structure
// Docs: https://dbml.dbdiagram.io/docs

Table usuarios {
following_user_id integer
followed_user_id integer
created_at timestamp
}

Table clientes {
id integer [primary key]
username varchar
role varchar
created_at timestamp
}

Table cobranca {
id integer [primary key]
title varchar
body text [note: 'Content of the post']
user_id integer [not null]
status varchar
created_at timestamp
}

Table administradoracondominio {
id integer [primary key]

}

Table administracaocondominio {
id integer [primary key]

}

Table unidadecondominio {
id integer [primary key]

}

Table boletos {
id integer [primary key]

}

Table bots {
id integer [primary key]

}
