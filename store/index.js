export const state = () => ({});

export const mutations = {};

export const actions = {
    async nuxtServerInit({ dispatch }) {
        await Promise.all([
            // dispatch('user/refreshUserCount'),
            dispatch('user/refresh'),

            dispatch('game/schedules'),
            dispatch('game/upcoming'),
            dispatch('game/active'),

            // Needs to only dispatch when User is logged in
            dispatch('game/applications'),

            // dispatch('badges/refresh'),
        ]);
    },

    async navigate(_, route) {
        this.app.router.push(route);
    },
};

// export const strict = process.env.NODE_ENV = "development";
export const strict = false;
