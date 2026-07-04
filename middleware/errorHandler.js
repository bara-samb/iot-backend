/**
 * ============================================================
 * Middleware de gestion centralisée des erreurs
 * ------------------------------------------------------------
 * Ce middleware est exécuté automatiquement lorsqu'une erreur
 * est transmise avec next(error).
 *
 * Il permet :
 *  - d'éviter de répéter les try/catch partout ;
 *  - de retourner des réponses JSON homogènes ;
 *  - de faciliter le débogage de l'application.
 * ============================================================
 */

const errorHandler = (err, req, res, next) => {

    // Affichage de l'erreur dans le terminal
    console.error("========== ERREUR ==========");
    console.error(err);
    console.error("============================");

    // Détermination du code HTTP
    const statusCode = err.statusCode || 500;

    // Réponse envoyée au client
    res.status(statusCode).json({

        success: false,

        message: err.message || "Erreur interne du serveur.",

        stack:
            process.env.NODE_ENV === "development"
                ? err.stack
                : undefined

    });

};

module.exports = errorHandler;