import { createMocks } from "node-mocks-http";
import handleJobs from "../../../api/jobs/index";

describe("/api/filters", () => {
    test("Get request returns 200 with success=true", async () => {
        const { req, res } = createMocks({
            method: "GET",
            query: {},
        });

        await handleJobs(req, res);

        expect(res._getStatusCode()).toBe(200);
        expect(res._getData()).toBeDefined();
        expect(JSON.parse(res._getData())).toEqual(
            expect.objectContaining({
                success: true,
            })
        );
    });
});
test("POST request returns 405 with success=false", async () => {
    const { req, res } = createMocks({
        method: "POST",
        query: {},
    });

    await handleJobs(req, res);

    expect(res._getStatusCode()).toBe(405);
    expect(res._getData()).toBeDefined();
    expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining({
            success: false,
        })
    );
});
