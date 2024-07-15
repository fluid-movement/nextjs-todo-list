import {createSeedClient} from "@snaplet/seed";

const main = async () => {
        const seed = await createSeedClient({dryRun: true});
        await seed.task_lists((x) => x(5));
        await seed.tasks((x) => x(20), {connect: true});
    }
;

main().then(r => r).catch(e => console.error(e));
