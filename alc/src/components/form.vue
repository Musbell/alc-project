<template>
  <div>
    <v-snackbar
      :timeout="timeout"
      class="green lighten-1"
      :top="y === 'top'"
      :bottom="y === 'bottom'"
      :right="x === 'right'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :vertical="mode === 'vertical'"
      v-model="snackbar"
    >
      Student added successfully
      <v-btn flat  @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-snackbar
      :timeout="timeout"
      class="red lighten-1"
      :top="y === 'top'"
      :bottom="y === 'bottom'"
      :right="x === 'right'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :vertical="mode === 'vertical'"
      v-model="snackbarError"
    >
      Problem adding student
      <v-btn flat  @click.native="snackbarError= false">Close</v-btn>
    </v-snackbar>
    <transition appear>
      <v-card>
        <v-card-media src="https://hdqwalls.com/wallpapers/material-design-blue-and-white-to.jpg" height="200px">
          <v-layout column align-center justify-center>
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" alt=""
                 id="profile">
          </v-layout>
        </v-card-media>

        <div class="container">
          <form id="form">
            <v-container grid-list-md>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-text-field
                    label="Last name"
                    v-model="lastName"
                    prepend-icon="face"
                    :error-messages="lastNameErrors"
                    @input="$v.lastName.$touch()"
                    @blur="$v.lastName.$touch()"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    label="First name"
                    v-model="firstName"
                    prepend-icon="account_circle"
                    :error-messages="firstNameErrors"
                    @input="$v.firstName.$touch()"
                    @blur="$v.firstName.$touch()"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-text-field
                    label="Other name"
                    v-model="otherName"
                    prepend-icon="account_box"
                    :error-messages="otherNameErrors"
                    @input="$v.otherName.$touch()"
                    @blur="$v.otherName.$touch()"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-select
                    label="Gender"
                    v-model="gender"
                    :items="genderEnum"
                    prepend-icon="accessibility"
                    :error-messages="genderErrors"
                    @change="$v.gender.$touch()"
                    @blur="$v.gender.$touch()"
                    required
                  ></v-select>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-dialog
                    persistent
                    v-model="modal"
                    lazy
                    full-width
                  >
                    <v-text-field
                      slot="activator"
                      label="Date of birth"
                      v-model="dateOfBirth"
                      prepend-icon="event"
                      readonly
                      :error-messages="dateOfBirthErrors"
                      @change="$v.dateOfBirth.$touch()"
                      @blur="$v.dateOfBirth.$touch()"
                      required
                    ></v-text-field>
                    <v-date-picker v-model="dateOfBirth" scrollable actions>
                      <template scope="{ save, cancel }">
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                          <v-btn flat color="primary" @click="save">OK</v-btn>
                        </v-card-actions>
                      </template>
                    </v-date-picker>
                  </v-dialog>
                </v-flex>
                <v-flex xs6>
                  <v-select
                    label="Nationality"
                    prepend-icon="map"
                    v-model="nationality"
                    :items="nationalityEnum"
                    :error-messages="nationalityErrors"
                    @change="$v.nationality.$touch()"
                    @blur="$v.nationality.$touch()"
                    required
                  ></v-select>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-select
                    label="Session of admission"
                    v-model="sessionOfAdmission"
                    prepend-icon="class"
                    :items="sessionOfAdmissionEnum"
                    :error-messages="sessionOfAdmissionErrors"
                    @change="$v.sessionOfAdmission.$touch()"
                    @blur="$v.sessionOfAdmission.$touch()"
                    required
                    autocomplete
                  ></v-select>
                </v-flex>
                <v-flex xs6>
                  <v-menu
                    lazy
                    :close-on-content-click="false"
                    v-model="menu"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-right="40"
                    max-width="290px"
                    min-width="290px"
                    :error-messages="dateOfAdmissionErrors"
                    @change="$v.dateOfAdmission.$touch()"
                    @blur="$v.dateOfAdmission.$touch()"
                  >
                    <v-text-field
                      slot="activator"
                      label="Date of admission"
                      v-model=" dateOfAdmission"
                      prepend-icon="event"
                      readonly
                      :error-messages="dateOfAdmissionErrors"
                    ></v-text-field>
                    <v-date-picker v-model="dateOfAdmission" no-title scrollable actions>
                      <template scope="{ save, cancel }">
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                          <v-btn flat color="primary" @click="save">OK</v-btn>
                        </v-card-actions>
                      </template>
                    </v-date-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-select
                    label="State of origin"
                    v-model="stateOfOrigin"
                    prepend-icon="pin_drop"
                    :items="stateEnum"
                    :error-messages=" stateOfOriginErrors"
                    @change="$v.stateOfOrigin.$touch()"
                    @blur="$v.stateOfOrigin.$touch()"
                    required
                    autocomplete
                  ></v-select>
                </v-flex>
                <v-flex xs6>
                  <v-select
                    label="religion"
                    v-model="religion"
                    prepend-icon="wc"
                    :items="religionEnum"
                    :error-messages="religionErrors"
                    @change="$v.religion.$touch()"
                    @blur="$v.religion.$touch()"
                    required
                  ></v-select>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-text-field
                    label="Phone number"
                    v-model="phone"
                    prepend-icon="phone_android"
                    :error-messages="phoneErrors"
                    :counter="11"
                    @input="$v.phone.$touch()"
                    @blur="$v.phone.$touch()"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    label="city"
                    v-model="city"
                    prepend-icon="location_city"
                    :error-messages="cityErrors"
                    @input="$v.city.$touch()"
                    @blur="$v.city.$touch()"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-select
                    label="State"
                    v-model="state"
                    prepend-icon="domain"
                    :items="stateEnum"
                    :error-messages=" stateErrors"
                    @change="$v.state.$touch()"
                    @blur="$v.state.$touch()"
                    required
                    autocomplete
                  ></v-select>
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    label="E-mail"
                    v-model="email"
                    prepend-icon="email"
                    :error-messages="emailErrors"
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    label="Address"
                    v-model="address"
                    prepend-icon="my_location"
                    :error-messages="addressErrors"
                    @input="$v.address.$touch()"
                    @blur="$v.address.$touch()"
                    multi-line
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>

            <v-btn @click="submit">submit</v-btn>
            <v-btn @click="clear">clear</v-btn>
          </form>
        </div>
      </v-card>
    </transition>
  </div>
</template>

<script>
  import { CREATE_STUDENT_MUTATION, ALL_STUDENTS_QUERY } from '../constants/graphql'
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email, numeric } from 'vuelidate/lib/validators'

  export default {
    name: "addStudent",
    mixins: [validationMixin],
    validations: {
      lastName: { required },
      firstName: { required },
      otherName: { required },
      gender: { required },
      dateOfBirth: { required },
      nationality: { required },
      sessionOfAdmission: { required },
      dateOfAdmission: { required },
      stateOfOrigin: { required },
      religion: { required },
      address: {required},
      city: {required},
      state: {required},
      email: { required, email },
      phone: { required,numeric, maxLength: maxLength(11) }
    },
    data () {
      return {
        lastName: '',
        firstName: '',
        otherName: '',
        dateOfBirth: null,
        gender: null,
        nationality: null,
        sessionOfAdmission: null,
        dateOfAdmission: null,
        stateOfOrigin: null,
        religion: null,
        address: '',
        city: null,
        state: null,
        email: '',
        phone: '',
        genderEnum: [
          'Male',
          'Female'
        ],
        nationalityEnum: [
          'Nigeria'
        ],
        sessionOfAdmissionEnum: [
          '2005/2006',
          '2006/2007',
          '2007/208',
          '2008/2009',
          '2009/2010',
          '2010/2011',
          '2011/2012',
          '2012/2013',
          '2013/2014',
          '2014/2015',
          '2015/2016',
          '2016/2017',
          '2017/2018'
        ],
        stateEnum: [
          'Abia',
          'Adamawa',
          'Anambra',
          'Akwa Ibom',
          'Bauchi',
          'Bayelsa',
          'Benue',
          'Borno',
          'Cross River',
          'Delta',
          'Ebonyi',
          'Enugu',
          'Edo',
          'Ekiti',
          'Gombe',
          'Imo',
          'Jigawa',
          'Kaduna',
          'Kano',
          'Katsina',
          'Kebbi',
          'Kogi',
          'Kwara',
          'Lagos',
          'Nasarawa',
          'Niger',
          'Ogun',
          'Ondo',
          'Osun',
          'Oyo',
          'Plateau',
          'Rivers',
          'Sokoto',
          'Taraba',
          'Yobe',
          'Zamfara'
        ],
        religionEnum: [
          'Islam',
          'Christianity',
          'Others'
        ],
        menu: false,
        modal: false,
        snackbar: false,
        snackbarError: false,
        color: 'success',
        y: 'top',
        x: 'right',
        mode: '',
        timeout: 6000,
        text: 'Hello, I\'m a snackbar'
      }
    },
    methods: {
      submit () {
        this.$v.$touch()
        const {
          lastName,
          firstName,
          otherName,
          gender,
          dateOfBirth,
          nationality,
          sessionOfAdmission,
          dateOfAdmission,
          stateOfOrigin,
          religion,
          address,
          city,
          state,
          email,
          phone
        } = this.$data
        this.$apollo.mutate({
          mutation: CREATE_STUDENT_MUTATION,
          variables: {
            lastName,
            firstName,
            otherName,
            gender,
            dateOfBirth,
            nationality,
            sessionOfAdmission,
            dateOfAdmission,
            stateOfOrigin,
            religion,
            address,
            city,
            state,
            email,
            phone
          }
        }).then(() => {
          this.snackbar = true
          return this.clear()
        }).catch(() => {
          this.snackbarError = true
        })
      },
      clear () {
        this.$v.$reset()
        this.lastName = ''
        this.firstName = ''
        this.otherName = ''
        this.dateOfBirth = null
        this.gender = null
        this.nationality = null
        this.sessionOfAdmission = null
        this.dateOfAdmission = null
        this.stateOfOrigin = null
        this.religion = null
        this.address = ''
        this.city = null
        this.state = null
        this.email = ''
        this.phone = ''
      }
    },
    computed: {
      lastNameErrors () {
        const errors = []
        if (!this.$v.lastName.$dirty) return errors
        !this.$v.lastName.required && errors.push('Last name is required.')
        return errors
      },
      firstNameErrors () {
        const errors = []
        if (!this.$v.firstName.$dirty) return errors
        !this.$v.firstName.required && errors.push('First name is required.')
        return errors
      },
      otherNameErrors () {
        const errors = []
        if (!this.$v.otherName.$dirty) return errors
        !this.$v.otherName.required && errors.push('Other name is required.')
        return errors
      },
      genderErrors () {
        const errors = []
        if (!this.$v.gender.$dirty) return errors
        !this.$v.gender.required && errors.push('Gender name is required.')
        return errors
      },
      dateOfBirthErrors () {
        const errors = []
        if (!this.$v.dateOfBirth.$dirty) return errors
        !this.$v.dateOfBirth.required && errors.push('Date f birth is required.')
        return errors
      },
      nationalityErrors () {
        const errors = []
        if (!this.$v.nationality.$dirty) return errors
        !this.$v.nationality.required && errors.push('Nationality is required.')
        return errors
      },
      sessionOfAdmissionErrors () {
        const errors = []
        if (!this.$v.sessionOfAdmission.$dirty) return errors
        !this.$v.sessionOfAdmission.required && errors.push('Session of admission is required.')
        return errors
      },
      dateOfAdmissionErrors () {
        const errors = []
        if (!this.$v.dateOfAdmission.$dirty) return errors
        !this.$v.dateOfAdmission.required && errors.push('Date of admission is required.')
        return errors
      },
      stateOfOriginErrors () {
        const errors = []
        if (!this.$v.stateOfOrigin.$dirty) return errors
        !this.$v.stateOfOrigin.required && errors.push('State of origin is required.')
        return errors
      },
      religionErrors () {
        const errors = []
        if (!this.$v.religion.$dirty) return errors
        !this.$v.religion.required && errors.push('Religion of origin is required.')
        return errors
      },
      addressErrors () {
        const errors = []
        if (!this.$v.address.$dirty) return errors
        !this.$v.address.required && errors.push('Address is required.')
        return errors
      },
      cityErrors () {
        const errors = []
        if (!this.$v.city.$dirty) return errors
        !this.$v.city.required && errors.push('City is required.')
        return errors
      },
      stateErrors () {
        const errors = []
        if (!this.$v.state.$dirty) return errors
        !this.$v.state.required && errors.push('State of origin is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
      phoneErrors () {
        const errors = []
        if (!this.$v.phone.$dirty) return errors
        !this.$v.phone.numeric && errors.push('Must be valid phone number')
        !this.$v.phone.maxLength && errors.push('Phone number must be at most 11 characters long')
        !this.$v.phone.required && errors.push('Phone of origin is required.')
        return errors
      }
    }
  }
</script>

<style scoped>
  #profile {
    width: 20%;
    border-radius: 50%;
    box-shadow: 0 16px 38px -12px rgba(0, 0, 0, 0.56), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);;
  }

</style>
