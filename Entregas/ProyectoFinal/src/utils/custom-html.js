export const resetPasswordNotification = (resetLink) =>
    `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Recuperación de Contraseña</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f0f0f0;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
          }
          .container {
              padding: 20px;
              background-color: #fff;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
              text-align: center;
          }
          .heading {
              font-size: 24px;
              margin-bottom: 20px;
          }
          .button {
              display: inline-block;
              padding: 10px 20px;
              background-color: #007bff;
              color: #fff;
              border-radius: 4px;
              text-decoration: none;
              font-weight: bold;
              transition: background-color 0.3s ease;
          }
          .button:hover {
              background-color: #0056b3;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h1 class="heading">Recuperación de Contraseña</h1>
          <p>Haga clic en el botón de abajo para recuperar su contraseña:</p>
            <a class="button" href="${resetLink}">Recuperar Contraseña</a>
      </div>
  </body>
  </html>`;

