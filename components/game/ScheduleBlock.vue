<template>
    <Applications :schedules="schedules">
        <Table slot-scope="{isApplied, cancel, enter}">
            <tr slot="head">
                <th @click="time = !time">Date</th>
                <th @click="time = !time">Time</th>
                <th @click="duration = !duration">Duration</th>
                <th @click="duration = !duration">Showing</th>
                <th></th>
            </tr>

            <tr v-for="schedule in schedules" :key="schedule.id">
                <td>
                    <div class="dow">{{ schedule.startTime | moment('dddd') }}</div>
                    <h4 class="date">{{ schedule.startTime | moment('MMMM D') }}</h4>
                </td>
                <td>
                    <h4 class="time">{{ schedule.startTime | moment('H:mm') }} UTC</h4>
                </td>
                <td>
                    <h4 class="duration">{{ durations[schedule.mode] || '30' }}</h4>
                </td>
                <td>
                    <div class="show">DevWars Live</div>
                    <div class="title">{{ description(schedule)}}</div>
                </td>
                <td>
                    <ButtonGroup>
                        <Button
                            v-if="!isApplied(schedule)"
                            class="primary"
                            @click="enter(schedule)"
                        >Register for Entry</Button>
                        <Button v-else class="outline danger" @click="cancel(schedule)">Resign</Button>
                    </ButtonGroup>
                </td>
            </tr>
        </Table>
    </Applications>
</template>


<script>
import { sortBy } from 'lodash';
import Table from '@/components/Table';
import Applications from '@/components/game/Applications';
import GameDurations from '../../utils/gameDurations';

export default {
    name: 'ScheduleBlock',

    components: { Table, Applications },

    props: {
        filter: {
            type: String,
            default: '',
        },

        count: {
            type: Number,
            default: 0,
        },
    },

    data: () => {
        return {
            durations: GameDurations,
            duration: false,
            time: true,
        };
    },

    computed: {
        schedules() {
            const ret = [];
            this.$store.state.game.upcoming.map((e) => {
                if (this.filter === '') ret.push(e);
                if (e.mode === this.filter) ret.push(e);
            });

            const subFilters = [];
            if (this.time) subFilters.push('startTime');
            if (this.duration) subFilters.push('mode');

            return sortBy(ret, subFilters);
        },
    },

    methods: {
        description(schedule) {
            const descriptions = {
                Classic: 'Classic - 3 VS 3',
                'Zen Garden': 'Zen Garden : 1 VS 1',
                Blitz: 'Blitz - 1 VS 1',
            };

            return descriptions[schedule.mode] || '';
        },
    },
};
</script>


<style lang="scss" scoped>
@import 'utils.scss';

.dow {
    text-transform: uppercase;
    font-size: $font-size-sm;
}

.show {
    text-transform: uppercase;
}

.duration:after {
    content: ' min';
    font-size: $font-size-xs;
}

.tournament .show {
    color: $bonus-color;

    &:before {
        @extend .far;
        content: $fa-trophy;
        margin-right: $xs-space;
    }
}

.Table /deep/ {
    thead,
    tr {
        display: table;
        width: 100%;
    }

    tbody {
        display: block;
        width: 100%;
        height: 300px;
        overflow-y: auto;
    }

    th,
    td {
        text-align: left;
        width: 20%;
    }

    td:last-of-type {
        text-align: right;
    }
}
</style>
