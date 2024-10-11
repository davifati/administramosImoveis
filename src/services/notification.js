export async function SendEmail(
    toEmail,
    fromEmail,
    subject,
    body
) {
    const params = {
        Destination: {
            ToAddresses: [toEmail],
        },
        Message: {
            Body: {
                Text: { Data: body },
            },
            Subject: { Data: subject },
        },
        Source: fromEmail,
    };

    try {
        const data = await ses.sendEmail(params).promise();
        console.log("Email enviado com sucesso", data);
        return {
            statusCode: 200,
            body: JSON.stringify('Email enviado com sucesso!'),
        };
    } catch (err) { }
}

export function SendZapZap(amount, company) {
    return fetch(
        new Request("https://gridchatapi.gridwebti.com.br/api/messages/send", {
            method: "POST",
            body: JSON.stringify({ "number": "5599999999999", "body": `${amount} novos boletos da ${company}` }),
        })
    );
}
