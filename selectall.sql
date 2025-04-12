
SELECT 
    administradora.id AS administradora_id,
    administradora.nome AS administradora_nome,
    administradora.site AS administradora_site,
    administradora.email AS administradora_email,
    administradora.telefones AS administradora_telefones,
    administradora.created AS administradora_created,
    administradora.updated AS administradora_updated,
    administradora.qtdeimoveis AS administradora_qtdeimoveis,

    administracao.id AS administracao_id,
    administracao.administradoracondominio_id AS administracao_administradoracondominio_id,
    administracao.nome AS administracao_nome,
    administracao.endereco AS administracao_endereco,
    administracao.complemento_endereco AS administracao_complemento_endereco,
    administracao.numero AS administracao_numero,
    administracao.cep AS administracao_cep,
    administracao.email AS administracao_email,
    administracao.telefones AS administracao_telefones,
    administracao.created AS administracao_created,
    administracao.updated AS administracao_updated,

    unidade.id AS unidade_id,
    unidade.administracaocondominio_id AS unidade_administracaocondominio_id,
    unidade.bloco AS unidade_bloco,
    unidade.num_unidade AS unidade_num_unidade,
    unidade.cep AS unidade_cep,
    unidade.num_pasta AS unidade_num_pasta,
    unidade.documento_proprietario AS unidade_documento_proprietario,
    unidade.nome_proprietario AS unidade_nome_proprietario,
    unidade.login AS unidade_login,
    unidade.senha AS unidade_senha,
    unidade.created AS unidade_created,
    unidade.updated AS unidade_updated,

    scraper.id AS scraper_id,
    scraper.num_pasta AS scraper_num_pasta,
    scraper.endereco_imovel AS scraper_endereco_imovel,
    scraper.data_vencimento AS scraper_data_vencimento,
    scraper.vlr_boleto AS scraper_vlr_boleto,
    scraper.linha_digitavel AS scraper_linha_digitavel,
    scraper.nome_administradora AS scraper_nome_administradora,
    scraper.link_pdf_boleto AS scraper_link_pdf_boleto,
    scraper.created AS scraper_created
FROM
    administradoracondominios AS administradora
LEFT JOIN 
    administracaocondominios AS administracao ON administradora.id = administracao.administradoracondominio_id
LEFT JOIN 
    unidadecondominios AS unidade ON administracao.id = unidade.administracaocondominio_id
LEFT JOIN 
    scrapercondominios AS scraper ON administradora.id = scraper.id
LIMIT 50;

select * from administradoracondominios
