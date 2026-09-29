<template>
    <section>
        <v-row 
            align="center" 
            justify="center" 
            no-gutters>
            <v-col cols="12" lg="6" sm="12">
                <slot name="left-content" class="text-left"></slot>
            </v-col>
            <v-col cols="12" lg="6" sm="12" class="my-3">
                <slot name="right-content"></slot>
            </v-col>
        </v-row>
    </section>
</template>