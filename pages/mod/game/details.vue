<template>
    <Card class="plain dark">
        <form>
            <h3>Game</h3>
            <Select v-model="game.mode" label="Game mode" class="group">
                <option value="Classic">Classic</option>
                <option value="Zen Garden">Zen Garden</option>
                <option value="Blitz">Blitz</option>
            </Select>

            <Input v-model="game.title" label="Theme" class="group"/>

            <h3>Objectives</h3>
            <div v-for="objective in game.objectives" :key="objective.id" class="objective">
                <Input
                    v-model="objective.description"
                    :label="`Objective ${objective.id}`"
                    class="group"
                    maxlength="110"
                />

                <SquareToggle
                    v-for="team of teams"
                    :key="team.id"
                    :name="team.name"
                    :active="!!teamCompletedObjective(team.id, objective)"
                    @change="toggleObjective(team.id, objective.id)"
                />
            </div>

            <h3 v-if="game.title === 'Zen Garden'">Zen Garden HTML</h3>
            <Textarea
                v-if="game.title === 'Zen Garden'"
                v-model="game.languageTemplates.html"
                label="HTML Code"
                class="group"
                rows="10"
            />

            <h3>Media</h3>
            <Input v-model="game.videoUrl" label="YouTube URL" class="group"/>

            <h3>Votes</h3>
            <Row>
                <Column v-for="team in teams" :key="team.id" :sm="6">
                    <div v-for="vote in team.votes" :key="vote.id">
                        <Input
                            :value="vote"
                            :label="`
                                ${Object.keys(team.votes).find(key => team.votes[key] === vote)}
                                -${team.name | capitalize} Votes
                            `"
                            class="group"
                            @change="updated => team.votes[vote] = updated"
                        />
                    </div>
                </Column>
            </Row>

            <!--
            <h3>Files</h3>
            <Row>
                <Column :sm="6">
                    <Input type="file" label="Blue Files" class="group"/>
                </Column>
                <Column :sm="6">
                    <Input type="file" label="Red Files" class="group"/>
                </Column>
            </Row>-->
        </form>
    </Card>
</template>


<script>
import Card from '@/components/Card';
import Input from '@/components/form/Input';
import Select from '@/components/form/Select';
import Textarea from '@/components/form/Textarea';
import SquareToggle from '../../../components/SquareToggle';
import { teams } from '@/utils/mixins';
import { teamCompletedObjective } from '@/utils';
import { names } from '../../../utils/auth';

export default {
    name: 'DashboardGameDetails',

    meta: {
        auth: names.MODERATOR,
    },

    components: { Card, SquareToggle, Input, Select, Textarea },

    mixins: [teams],

    data: () => ({
        date: '',
        time: '',
    }),

    computed: {
        game() {
            return this.$store.state.game.game;
        },
    },

    methods: {
        teamCompletedObjective,

        toggleObjective(teamId, objectiveId) {
            const objectives = this.game.teams[teamId].objectives;

            if (objectives[objectiveId] === 'complete') {
                objectives[objectiveId] = 'incomplete';
            } else {
                objectives[objectiveId] = 'complete';
            }
        },
    },
};
</script>

<style lang="scss" scoped>
form {
    max-width: 500px;
}

.objective {
    display: flex;
    width: 100%;
}
</style>

