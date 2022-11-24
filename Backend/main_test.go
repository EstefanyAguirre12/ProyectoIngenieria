package main

import (
    "net/http"
    "testing"

    "github.com/pocketbase/pocketbase/tests"
    "github.com/pocketbase/pocketbase/tokens"
)

const testDataDir = "./pb_data"

func TestHelloEndpoint(t *testing.T) {
    recordToken, err := generateRecordToken("users", "00019919@uca.edu.sv")
    if err != nil {
        t.Fatal(err)
    }

    adminToken, err := generateAdminToken("leonardoalbinana@gmail.com")
    if err != nil {
        t.Fatal(err)
    }

    setupTestApp := func() (*tests.TestApp, error) {
        testApp, err := tests.NewTestApp(testDataDir)
        if err != nil {
            return nil, err
        }

        bindAppHooks(testApp)

        return testApp, nil
    }

    scenarios := []tests.ApiScenario{
        {
            Name:            "try with different http method, eg. POST",
            Method:          http.MethodPost,
            Url:             "/api/collections/users/records",
            ExpectedStatus:  405,
            ExpectedContent: []string{""data":{}"},
            TestAppFactory:  setupTestApp,
        },
        {
            Name:            "try as guest (aka. no Authorization header)",
            Method:          http.MethodGet,
            Url:             "/api/collections/users/records",
            ExpectedStatus:  401,
            ExpectedContent: []string{""data":{}"},
            TestAppFactory:  setupTestApp,
        },
        {
            Name:   "try as authenticated app user",
            Method: http.MethodGet,
            Url:    "/api/collections/users/records",
            RequestHeaders: map[string]string{
                "Authorization": recordToken,
            },
            ExpectedStatus:  401,
            ExpectedContent: []string{""data":{}"},
            TestAppFactory:  setupTestApp,
        },
        {
            Name:   "try as authenticated admin",
            Method: http.MethodGet,
            Url:    "/api/collections/users/records",
            RequestHeaders: map[string]string{
                "Authorization": adminToken,
            },
            ExpectedStatus:  200,
            ExpectedContent: []string{"Hello world!"},
            TestAppFactory:  setupTestApp,
        },
    }

    for _, scenario := range scenarios {
        scenario.Test(t)
    }
}

func generateAdminToken(email string) (string, error) {
    app, err := tests.NewTestApp(testDataDir)
    if err != nil {
        return "", err
    }
    defer app.Cleanup()

    admin, err := app.Dao().FindAdminByEmail(email)
    if err != nil {
        return "", err
    }

    return tokens.NewAdminAuthToken(app, admin)
}

func generateRecordToken(collectionNameOrId string, email string) (string, error) {
    app, err := tests.NewTestApp(testDataDir)
    if err != nil {
        return "", err
    }
    defer app.Cleanup()

    record, err := app.Dao().FindAuthRecordByEmail(collectionNameOrId, email)
    if err != nil {
        return "", err
    }

    return tokens.NewRecordAuthToken(app, record)
}