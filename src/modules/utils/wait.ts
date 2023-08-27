export const wait = async function(time: number) {
    return new Promise<Partial<{ message: string }>>(
        (res, rej) => {
            return setTimeout(
                () => {
                    try {
                        res({ message: "success" });
                    } catch (e: any) {
                        rej(e);
                        throw new Error(e.message, { ...e });
                    }
                },
                time
            );
        }
    )
}

export const sleep = wait;