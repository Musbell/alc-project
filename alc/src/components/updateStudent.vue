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
      Student updated successfully
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
      Problem updating student
      <v-btn flat  @click.native="snackbarError= false">Close</v-btn>
    </v-snackbar>
    <transition appear>
      <v-progress-circular indeterminate color="primary" v-if="loading"></v-progress-circular>
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
                    v-model= Student.lastName
                    prepend-icon="face"
                    :error-messages="newLastNameErrors"
                    @input="$v.newLastName.$touch()"
                    @blur="$v.newLastName.$touch()"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    label="First name"
                    v-model= Student.firstName
                    prepend-icon="account_circle"
                    :error-messages="newFirstNameErrors"
                    @input="$v.newFirstName.$touch()"
                    @blur="$v.newFirstName.$touch()"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-text-field
                    label="Other name"
                    v-model= Student.otherName
                    prepend-icon="account_box"
                    :error-messages="newOtherNameErrors"
                    @input="$v.newOtherName.$touch()"
                    @blur="$v.newOtherName.$touch()"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-select
                    label="Gender"
                    v-model= Student.gender
                    prepend-icon="accessibility"
                    :items="newGenderEnum"
                    :error-messages="newGenderErrors"
                    @change="$v.newGender.$touch()"
                    @blur="$v.newGender.$touch()"
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
                      v-model= Student.dateOfBirth
                      prepend-icon="event"
                      readonly
                      :error-messages="newDateOfBirthErrors"
                      @change="$v.newDateOfBirth.$touch()"
                      @blur="$v.newDateOfBirth.$touch()"
                      required
                    ></v-text-field>
                    <v-date-picker v-model="Student.dateOfBirth" scrollable actions>
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
                    v-model= Student.nationality
                    :items="newNationalityEnum"
                    :error-messages="newNationalityErrors"
                    @change="$v.newNationality.$touch()"
                    @blur="$v.newNationality.$touch()"
                    required
                  ></v-select>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-select
                    label="Session of admission"
                    v-model= Student.sessionOfAdmission
                    prepend-icon="class"
                    :items="newSessionOfAdmissionEnum"
                    :error-messages="newSessionOfAdmissionErrors"
                    @change="$v.newSessionOfAdmission.$touch()"
                    @blur="$v.newSessionOfAdmission.$touch()"
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
                    :error-messages="newDateOfAdmissionErrors"
                    @change="$v.newDateOfAdmission.$touch()"
                    @blur="$v.newDateOfAdmission.$touch()"
                  >
                    <v-text-field
                      slot="activator"
                      label="Date of admission"
                      v-model= Student.dateOfAdmission
                      prepend-icon="event"
                      readonly
                    ></v-text-field>
                    <v-date-picker v-model="Student.dateOfAdmission" no-title scrollable actions>
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
                    v-model= Student.stateOfOrigin
                    prepend-icon="pin_drop"
                    :items="newStateEnum"
                    :error-messages=" newStateOfOriginErrors"
                    @change="$v.newStateOfOrigin.$touch()"
                    @blur="$v.newStateOfOrigin.$touch()"
                    required
                    autocomplete
                  ></v-select>
                </v-flex>
                <v-flex xs6>
                  <v-select
                    label="Religion"
                    v-model= Student.religion
                    prepend-icon="wc"
                    :items="newReligionEnum"
                    :error-messages="newReligionErrors"
                    @change="$v.newReligion.$touch()"
                    @blur="$v.newReligion.$touch()"
                    required
                  ></v-select>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-text-field
                    label="Phone number"
                    v-model= Student.phone
                    prepend-icon="phone_android"
                    :error-messages="newPhoneErrors"
                    :counter="11"
                    @input="$v.newPhone.$touch()"
                    @blur="$v.newPhone.$touch()"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    label="City"
                    v-model= Student.city
                    prepend-icon="location_city"
                    :error-messages="newCityErrors"
                    @input="$v.newCity.$touch()"
                    @blur="$v.newCity.$touch()"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-select
                    label="State"
                    v-model= Student.state
                    prepend-icon="domain"
                    :items="newStateEnum"
                    :error-messages=" newStateErrors"
                    @change="$v.newState.$touch()"
                    @blur="$v.newState.$touch()"
                    required
                    autocomplete
                  ></v-select>
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    label="Email"
                    v-model= Student.email
                    prepend-icon="email"
                    :error-messages="newEmailErrors"
                    @input="$v.newEmail.$touch()"
                    @blur="$v.newEmail.$touch()"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    label="Address"
                    v-model= Student.address
                    prepend-icon="my_location"
                    :error-messages="newAddressErrors"
                    @input="$v.newAddress.$touch()"
                    @blur="$v.newAddress.$touch()"
                    multi-line
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>

            <v-btn @click="update">update</v-btn>
            <v-btn class="error" dark @click.stop="dialog3 = true">delete</v-btn>
          </form>
        </div>
      </v-card>
    </transition>
     <v-dialog v-model="dialog3">
            <v-card>
        <v-card-title>
           <v-icon>warning</v-icon>
          <v-spacer></v-spacer>
          </v-card-title>
              <v-card-text>Are you sure you want to delete student?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click.native="deleteStudent">Yes</v-btn>
          <v-btn color="green darken-1" flat="flat" @click.native="dialog3 = false">Cancel</v-btn>
        </v-card-actions>
        </v-card>
      </v-dialog>
  </div>
</template>

<script>
  import { UPDATE_STUDENT_MUTATION, STUDENT_QUERY, DELETE_STUDENT_MUTATION } from '../constants/graphql'
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email, numeric } from 'vuelidate/lib/validators'

  export default {
    name: 'updateStudent',
    mixins: [validationMixin],
    validations: {
      newLastName: {required},
      newFirstName: {required},
      newOtherName: {required},
      newGender: {required},
      newDateOfBirth: {required},
      newNationality: {required},
      newSessionOfAdmission: {required},
      newDateOfAdmission: {required},
      newStateOfOrigin: {required},
      newReligion: {required},
      newAddress: {required},
      newCity: {required},
      newState: {required},
      newEmail: {required, email},
      newPhone: {required, numeric, maxLength: maxLength(11)}
    },
    data () {
      return {
        dialog3: false,
        notifications: false,
        sound: true,
        widgets: false,
        Student: {},
        loading: 0,
        paramId: this.$route.params.id,
        newGenderEnum: [
          'Male',
          'Female'
        ],
        newNationalityEnum: [
          'Nigeria'
        ],
        newSessionOfAdmissionEnum: [
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
        newStateEnum: [
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
        newReligionEnum: [
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
      update () {
        const {
          id,
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
          phone,
        } = this.Student
        this.$v.$touch()
        this.$apollo.mutate({
          mutation: UPDATE_STUDENT_MUTATION,
          variables: {
            id,
            newLastName: lastName,
            newFirstName: firstName,
            newOtherName: otherName,
            newGender: gender,
            newDateOfBirth: dateOfBirth,
            newNationality: nationality,
            newSessionOfAdmission: sessionOfAdmission,
            newDateOfAdmission: dateOfAdmission,
            newStateOfOrigin: stateOfOrigin,
            newReligion: religion,
            newAddress: address,
            newCity: city,
            newState: state,
            newEmail: email,
            newPhone: phone
          }
        }).then(() => {
          this.snackbar = true
        }).catch(() => {
          this.snackbarError = true
        })
      },
      deleteStudent () {
        const { id } = this.Student
        this.$apollo.mutate({
          mutation: DELETE_STUDENT_MUTATION,
          variables: {
            id
          }
        }).then(() => {
          this.$router.push({path: '/students'})
        }).catch((error) => {
          this.snackbarError = true
          alert(error)
        })
      }
    },
    apollo: {
      Student: {
        query: STUDENT_QUERY,
        loadingKey: 'loading',
        variables () {
          return {
            id: this.paramId
          }
        },
        result ({ data }) {
          this.Student = Object.assign({}, data.Student)
        }
      }
    },
    computed: {
      newLastNameErrors () {
        const errors = []
        if (this.$v.newLastName.$dirty) return errors
        this.$v.newLastName.required && errors.push('Last name is required.')
        return errors
      },
      newFirstNameErrors () {
        const errors = []
        if (this.$v.newFirstName.$dirty) return errors
        this.$v.newFirstName.required && errors.push('First name is required.')
        return errors
      },
      newOtherNameErrors () {
        const errors = []
        if (this.$v.newOtherName.$dirty) return errors
        this.$v.newOtherName.required && errors.push('Other name is required.')
        return errors
      },
      newGenderErrors () {
        const errors = []
        if (this.$v.newGender.$dirty) return errors
        this.$v.newGender.required && errors.push('newGender name is required.')
        return errors
      },
      newDateOfBirthErrors () {
        const errors = []
        if (this.$v.newDateOfBirth.$dirty) return errors
        this.$v.newDateOfBirth.required && errors.push('Date f birth is required.')
        return errors
      },
      newNationalityErrors () {
        const errors = []
        if (this.$v.newNationality.$dirty) return errors
        this.$v.newNationality.required && errors.push('newNationality is required.')
        return errors
      },
      newSessionOfAdmissionErrors () {
        const errors = []
        if (this.$v.newSessionOfAdmission.$dirty) return errors
        this.$v.newSessionOfAdmission.required && errors.push('Session of admission is required.')
        return errors
      },
      newDateOfAdmissionErrors () {
        const errors = []
        if (this.$v.newDateOfAdmission.$dirty) return errors
        this.$v.newDateOfAdmission.required && errors.push('Date of admission is required.')
        return errors
      },
      newStateOfOriginErrors () {
        const errors = []
        if (this.$v.newStateOfOrigin.$dirty) return errors
        this.$v.newStateOfOrigin.required && errors.push('newState of origin is required.')
        return errors
      },
      newReligionErrors () {
        const errors = []
        if (this.$v.newReligion.$dirty) return errors
        this.$v.newReligion.required && errors.push('newReligion of origin is required.')
        return errors
      },
      newAddressErrors () {
        const errors = []
        if (this.$v.newAddress.$dirty) return errors
        this.$v.newAddress.required && errors.push('newAddress is required.')
        return errors
      },
      newCityErrors () {
        const errors = []
        if (this.$v.newCity.$dirty) return errors
        this.$v.newCity.required && errors.push('newCity is required.')
        return errors
      },
      newStateErrors () {
        const errors = []
        if (this.$v.newState.$dirty) return errors
        this.$v.newState.required && errors.push('newState of origin is required.')
        return errors
      },
      newEmailErrors () {
        const errors = []
        if (this.$v.newEmail.$dirty) return errors
        !this.$v.newEmail.email && errors.push('Must be valid e-mail')
        this.$v.newEmail.required && errors.push('E-mail is required')
        return errors
      },
      newPhoneErrors () {
        const errors = []
        if (this.$v.newPhone.$dirty) return errors
        !this.$v.newPhone.numeric && errors.push('Must be valid newPhone number')
        !this.$v.newPhone.maxLength && errors.push('newPhone number must be at most 11 characters long')
        this.$v.newPhone.required && errors.push('newPhone of origin is required.')
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
