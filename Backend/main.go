package main

import (
    "log"
    "net/http"
    "os"

    "github.com/labstack/echo/v5"
    "github.com/pocketbase/pocketbase"
    "github.com/pocketbase/pocketbase/apis"
    "github.com/pocketbase/pocketbase/core"
)

func main() {
    app := pocketbase.New()
    setupCustomRoutes(app)
    app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
        e.Router.AddRoute(echo.Route{
            Method: http.MethodGet,
            Path:   "/api/hello",
            Handler: func(c echo.Context) error {
                return c.String(200, "Hello world!")
            },
            Middlewares: []echo.MiddlewareFunc{
                apis.RequireGuestOnly(),
            },
        })

        return nil
    })

    if err := app.Start(); err != nil {
        log.Fatal(err)
    }
}
func SetupStaticFrontendRoutes(app *pocketbase.PocketBase) {
	//Static frontend
	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		// serves static files from the provided public dir (if exists)
		e.Router.GET("/*", apis.StaticDirectoryHandler(os.DirFS("./public"), true))

		return nil
	})
}

func setupCustomRoutes(app *pocketbase.PocketBase) {
	SetupStaticFrontendRoutes(app)
}