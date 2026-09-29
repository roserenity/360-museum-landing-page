<template>
  <v-form 
    v-model="valid"
    ref="form"
    lazy-validation>
    <v-container>
      <v-text-field
        v-model="firstname"
        :rules="rules.firstNameRules"
        label="First Name"
        required
        color="white"
      />
      <v-text-field
        v-model="lastname"
        :rules="rules.lastNameRules"
        label="Last Name"
        required
        color="white"
      />
      <v-text-field
        v-model="email"
        :rules="rules.emailRules"
        label="E-mail"
        required
        color="white"
      />
      <v-menu
        ref="menu"
        v-model="menu"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            :rules="rules.birthdateRules"
            label="Birthday"
            color="white"
            readonly
            v-bind="attrs"
            v-on="on"
          >
            <v-icon slot="append" color="white">
                mdi-menu-down
            </v-icon>
          </v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          :active-picker.sync="activePicker"
          min="1950-01-01"
          max="2005-01-01"
          @change="save"
        />
      </v-menu>
      <v-checkbox
        v-model="checkboxes.isSubscribedNews"
        color="white"
      >
        <template v-slot:label>
          <span
            id="isSubscribedNewsLabel"
            class="text-8 white--text">
              {{ isSubscribedNewsLabel }}
          </span>
        </template>
      </v-checkbox>
      <v-checkbox
        v-model="checkboxes.isSubscribedPartners"
        color="white white--text">
        <template v-slot:label>
          <span 
            id="isSubscribedPartnersLabel" 
            class="text-8">
              {{ isSubscribedPartnersLabel }}
          </span>
        </template>
      </v-checkbox>
      <v-checkbox
        v-model="checkboxes.agreedToTerms"
        color="white"
        :rules="rules.agreedToTermsRules"
      >
        <template v-slot:label>
          <div class="text-8">
          I agree to the 
          <b>
            <span
              @click.stop.prevent="openTCDialog">
              Terms and Conditions
            </span>.
          </b>
          </div>
        </template>
      </v-checkbox>
      <v-btn 
        text 
        class="btn mt-6 title-text text-2"
        dark
        @click="submit">
          SEND INVITATION
      </v-btn>
      <div 
        class="text-center" 
        width="fit-content">
        <v-dialog
          v-model="dialog"
          persistent
          class="custom-bg-1"
          width="fit-content" >
        <section class="custom-bg-1 padding-tb pa-10 text-center" >
          <v-icon
            role="img"
            aria-hidden="false"
            color="white"
            @click="dialog = false"
            class="float-end"
          >
            mdi-close
          </v-icon>
          <v-container class="redText">
            <h1 v-if="success" class="title-text text-1">{{ successDialog.header }}</h1>
            <h1 v-if="termsAndConditions" class="title-text text-1">{{ termsAndConditionsDialog.header }}</h1>
          </v-container>
          <v-container v-if="success" class="white--text">
            {{ successDialog.message }}
          </v-container>
          <v-container v-if="termsAndConditions" class="white--text text-8">
            <p>
              This is a concept project for a portfolio. This form is a demo: nothing
              you enter here is sent, stored or shared anywhere.
            </p>
            <p>
              In a live version, agreeing to these terms would mean the museum may
              collect, store and process your personal information to manage your access
              pass. You could opt out of communications, and request a copy, correction
              or deletion of your data, at any time.
            </p>
            <p>
              Should you have any complaints about the use of your personal information,
              you can direct them to the National Privacy Commission.
            </p>
          </v-container>
        </section>
        </v-dialog>
      </div>
    </v-container>
  </v-form>
</template>

<style>
  .v-text-field input, .v-label{
    color: white !important;
  }
  /** border color */
  .v-input__slot::before  { 
    border-color: white !important;
  }
  .v-input--selection-controls .v-icon{
    color: white  !important;
  }
  @media screen and (max-device-width: 480px) {
    .v-text-field input, .v-label{
      font-size: 13px;
    }
}
</style>

<script>
export default {
  data: () => ({
    valid: true,
    firstname: '',
    lastname: '',
    email: '',
    menu: false,
    activePicker: null,
    date: null,
    checkboxes: {
      isSubscribedNews: false,
      isSubscribedPartners: false,
      agreedToTerms: false,
    },
    isSubscribedNewsLabel: 'Please use my personal information to send me news and updates about the museum and its events.',
    isSubscribedPartnersLabel: 'Please share my personal information with the museum\'s partners, so that they also can contact me about products and services that might be of interest to me.',
    rules: {
      firstNameRules: [
        v => !!v || 'First Name is required',
      ],
      lastNameRules: [
        v => !!v || 'Last Name is required',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      birthdateRules: [
        v => !!v || 'Birthdate is required'
      ],
      agreedToTermsRules: [
        v => !!v || 'You must agree to continue!'
      ],
    },
    dialog: false,
    success: false,
    termsAndConditions: false,
    successDialog: {
      header: 'INVITE SUCCESSFULLY SENT!',
      message: "THIS IS A DEMO, SO NO EMAIL WAS ACTUALLY SENT. IN THE LIVE VERSION, YOUR CONFIRMATION WOULD ARRIVE IN YOUR INBOX."
    },
    termsAndConditionsDialog: {
      header: 'TERMS & CONDITIONS',
    }
  }),
  methods: {
    save (date) {
      this.$refs.menu.save(date)
    },
    submit(){
      if (!this.$refs.form.validate()) return
      this.openSuccessDialog()
      this.$refs.form.reset()
    },
    openSuccessDialog(){
      this.termsAndConditions = false
      this.success = true
      this.dialog = true
    },
    openTCDialog(){
      this.success = false
      this.termsAndConditions = true
      this.dialog = true
    }
  },
}
</script>