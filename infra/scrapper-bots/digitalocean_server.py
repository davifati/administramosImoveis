import pulumi
import pulumi_digitalocean as do

config = pulumi.Config()
do_token = config.require("do_token")
ssh_key_id = config.require("ssh_key_id")

# Criando um Droplet na DigitalOcean
server = do.Droplet(
    "nextjs-server",
    region="nyc3",
    size="s-1vcpu-1gb",
    image="ubuntu-22-04-x64",
    ssh_keys=[ssh_key_id],
    user_data="""#!/bin/bash
    apt update && apt upgrade -y
    apt install -y nodejs npm git
    npm install -g pm2
    git clone https://github.com/seu-repositorio/nextjs-app.git /var/www/nextjs
    cd /var/www/nextjs && npm install
    pm2 start npm --name nextjs -- run start
    pm2 save
    pm2 startup
    """,
)

# Criando um firewall
firewall = do.Firewall(
    "nextjs-firewall",
    inbound_rules=[
        do.FirewallInboundRuleArgs(
            protocol="tcp",
            ports="22",
            sources=[do.FirewallInboundRuleSourceArgs(addresses=["0.0.0.0/0"])],
        ),
        do.FirewallInboundRuleArgs(
            protocol="tcp",
            ports="3000",
            sources=[do.FirewallInboundRuleSourceArgs(addresses=["0.0.0.0/0"])],
        ),
    ],
    outbound_rules=[
        do.FirewallOutboundRuleArgs(
            protocol="tcp",
            ports="1-65535",
            destinations=[
                do.FirewallOutboundRuleDestinationArgs(addresses=["0.0.0.0/0"])
            ],
        ),
    ],
    droplet_ids=[server.id],
)

pulumi.export("server_ip", server.ipv4_address)
