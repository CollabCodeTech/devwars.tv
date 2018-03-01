<template>
    <div>
        <div class="modpanel__header">
            <div class="modpanel__header-main">
                <h1 class="modpanel__header-title">{{ game.timestamp | moment('mediumDate')}}</h1>
                <h2 class="modpanel__header-subtitle">
                    #{{ game.id }}
                    &nbsp;&nbsp;/&nbsp;&nbsp;
                    S{{ game.season}}
                    &nbsp;&nbsp;/&nbsp;&nbsp;
                    {{ game.name }}
                    &nbsp;&nbsp;/&nbsp;&nbsp;
                    <strong class="color-warning">{{ game.active ? 'Active' : 'Preparing'}}</strong>
                </h2>
            </div>

            <div class="modpanel__header-actions">
                <a href="/mod/games" class="btn btn-outline-gray">Back</a>
                <button ng-show="!mod.game.done && !mod.game.active" async-click="mod.activate()"
                        class="btn btn-primary">
                    Activate
                </button>
                <button v-async-click="[save]" class="btn btn-primary">Save</button>
                <button async-click="mod.delete()" class="btn btn-secondary">Delete</button>
            </div>
        </div>

        <nav class="nav-tabs">
            <nuxt-link :to="'/mod/game/details?game=' + game.id" class="nav-tabs__item">Details</nuxt-link>
            <nuxt-link :to="'/mod/game/brief?game=' + game.id" class="nav-tabs__item">Brief</nuxt-link>
        </nav>

        <nuxt/>
    </div>
</template>

<script>
    import Component, {State} from 'nuxt-class-component';
    import Vue from 'vue';
    import Http from "../../services/Http";

    @Component({
        components: {}
    })
    export default class DashboardGame extends Vue {
        @State(state => state.game.game) game;


        async save() {
            let game = await Http.for('game').save(this.game);

            this.$store.commit('game/game', game);
        }

        async fetch({store, query}) {
            await store.dispatch('game/game', query.game);
        }
    }
</script>