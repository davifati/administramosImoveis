export function filterValidDataImobiliarias(dataImobiliarias) {
    const validDataImobiliarias = [];
    const seenCredentials = new Set();

    dataImobiliarias.forEach(imobiliaria => {
        const siteAdministradora = imobiliaria["SITE ADMINISTRADORA"];
        const login = imobiliaria["LOGIN"];
        const senha = imobiliaria["SENHA"];
        const pasta = imobiliaria["PASTA"]

        if (
            siteAdministradora && siteAdministradora.trim() !== "" &&
            login && login.trim() !== "" &&
            senha && senha.trim() !== ""
        ) {
            const key = `${siteAdministradora.trim().toLowerCase()}|${login.trim().toLowerCase()}|${senha.trim().toLowerCase()}`;

            if (!seenCredentials.has(key)) {
                seenCredentials.add(key);

                validDataImobiliarias.push({
                    ...imobiliaria,
                    "NUM_PASTA": pasta,
                    "SITE_ADMINISTRADORA": siteAdministradora.trim().toLowerCase(),
                    "LOGIN": login.trim().toLowerCase(),
                    "SENHA": senha.trim().toLowerCase()
                });
            }
        }
    });

    return validDataImobiliarias;
}