import jwt from "jsonwebtoken";
import { TOKEN_SECRET, ADMIN_USER, ADMIN_PASSWORD } from "../config.js";
import { createAccessToken } from "../jwt.js";

/* Modulo de iniciar sesion */
export const login = async (req, res) => {
  try {
    const { usuario, password } = req.body;
    if (usuario === ADMIN_USER && password === ADMIN_PASSWORD) {

      const token = await createAccessToken({
        id: 'admin',
        name: 'Administrador',
      });

      res.cookie("token", token, {
        secure: true,
        sameSite: "none",
      });

      return res.json({
        id: "admin",
        name: "Administrador",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


/* Modulo de verificar el token del usuario */
export const verifyToken = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.send(false);

    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
      if (error) return res.sendStatus(401);

      if (user.id === 'admin') {
        return res.json({
          id: "admin",
          name: "Administrador",
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

/* Modulo de cerrar la session del usuario */
export const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });
  return res.sendStatus(200);
};