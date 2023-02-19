<script setup lang="ts">
import { ref } from "vue"

interface Settings {
    title: string
    description: string,
    enabled: boolean
}

const settings = ref<Settings[]>([
    { title: "Remove background for uploaded person images", description: "Automatically remove the background of images that are uploaded to a specific Person. This could increase the quality of detected hits.", enabled: true },
    { title: "Enable person functionality", description: "Enables face detection, person search & other related functionality", enabled: false },
    { title: "Enable audio functionality", description: "Enables audio upload & other related functionality", enabled: true },
    { title: "Enable file functionality", description: "Enables file upload & other related functionality", enabled: true },
    { title: "Enable label functionality", description: "Enables label detection & other related functionality", enabled: true },
    { title: "Enable tag functionality", description: "Enables automatic tagging of IPTC tags when ingesting video & images", enabled: true },
])
</script>

<template>
    <div class="settings-container">
        <div class="table-row" v-for="(setting, index) in settings" @mouseup="() => setting.enabled = !setting.enabled">
            <div class="sub-row title-row">
                <div class="title">{{ setting.title }}</div>
                <label class="toggle-switch" @mouseup.stop>
                    <input type="checkbox" v-model="setting.enabled">
                    <span class="toggle-slider"></span>
                </label>
            </div>
            <div class="sub-row">
                <div class="description">{{ setting.description }}</div>
            </div>
        </div>
    </div>
</template>
  
<style scoped lang="scss">
.settings-container {
    $defaultGap: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    gap: $defaultGap;
    margin: 2rem auto;
    padding: 1.5rem;
    background-color: #121722;
    color: #d8dce0;
    font-size: 14px;

    .table-row {
        display: table-row;
        text-align: left;
        width: 100%;

        .sub-row {
            display: flex;
            justify-content: space-between;
            align-items: center;

            &.title-row {
                padding: 2px;
                background-color: #21262d;
                border-radius: 6px;
            }
        }

        &:hover {
            color: white;
            cursor: default;
        }

        .title,
        .description {
            padding: 4px;
            text-overflow: ellipsis;
            overflow: hidden;
        }

        .title {
            border-radius: $defaultGap;
        }

        .description {
            margin-left: $defaultGap;
            font-size: 12px;
        }
    }

    .toggle-switch {
        position: relative;
        width: 45px;
        min-width: 45px;
        height: 22px;
        margin-right: 18px;

        $transitionDuration: 0.2s;
        $activeColor: #447684;

        input[type="checkbox"] {
            opacity: 0;
            width: 0;
            height: 0;
        }

        .toggle-slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #494d54;
            border-radius: 24px;
            transition: $transitionDuration background-color;
            box-sizing: border-box;

            &:active {
                outline: 1px solid white;
                transition: none;
            }

            $thumbDimension: 18px;

            &:before {
                position: absolute;
                content: "";
                height: $thumbDimension;
                width: $thumbDimension;
                left: 2px;
                bottom: 2px;
                background-color: #d2d9e1;
                border-radius: calc($thumbDimension / 2);
                transition: $transitionDuration transform, scale, border-radius ease-out;
            }
        }

        input[type="checkbox"]:checked+.toggle-slider {
            background-color: $activeColor;
        }

        input[type="checkbox"]:focus+.toggle-slider {
            outline: 1px solid white;
        }

        input[type="checkbox"]:checked+.toggle-slider:before {
            transform: translateX(24px) scaleX(0.55);
            border-radius: 7px;
        }
    }
}
</style>