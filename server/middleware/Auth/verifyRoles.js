export default function verifyRoles(...allowedRoles) {
  return async (req, res, next) => {
    try {
      const user = req.user;
      if (!user)
        return res.status(412).json({ message: "Bearer not verified" });
      const allowedRolesLst = [...allowedRoles];
      const result = user.roles
        .map((role) => allowedRolesLst.includes(role))
        .find((val) => val === true);

      if (!result) return res.status(403).json({ message: "No permission" });
      next();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
}
