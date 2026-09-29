<template>
    <section>
        <v-row no-gutters>
            <v-col cols="12" lg="4"></v-col>
            <v-col cols="12" lg="4">
                <slot name="top-content"></slot>
            </v-col>
            <v-col cols="12" lg="4"></v-col>
		</v-row>
        <v-row no-gutters>
            <v-col cols="12" lg="2"></v-col>
            <v-col cols="12" lg="8">
                <slot name="bottom-content"></slot>
            </v-col>
            <v-col cols="12" lg="2"></v-col>
		</v-row>
    </section>
</template>