<template>
  <v-container fluid>
    <v-app-bar class="px-3" color="red-lighten-1" flat density="compact">
    <v-spacer></v-spacer>
      <h3>Consuming RESTful API in VUE</h3>
    <v-spacer></v-spacer>
    </v-app-bar>
    <v-table fixed-header height="500" :loading="loading">
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Salary</th>
          <th class="text-left">Approved</th>
          <th class="text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(person, key) in people" :key="key">
          <td>{{ person.name }}</td>
          <td>{{ person.salary }}</td>
          <td>{{ person.approved }}</td>
          <td>
            <v-tooltip text="Editar Cadastro" location="bottom">
              <template v-slot:activator="{ props }">
                <v-btn
                  class="mr-4"
                  icon="mdi-pencil"
                  size="small"
                  v-bind="props"
                  @click="edit(person)"
                ></v-btn>
              </template>
            </v-tooltip>
            <v-tooltip text="Deletar Registro" location="bottom">
              <template v-slot:activator="{ props }">
                <v-btn
                  icon="mdi-delete"
                  size="small"
                  color="red"
                  v-bind="props"
                  @click="remove(person)"
                ></v-btn>
              </template>
            </v-tooltip>
          </td>
        </tr>
      </tbody>
    </v-table>
    <v-divider class="my-10"></v-divider>
    <v-card>
      <v-card-title primary-title> Person Form </v-card-title>
      <v-card-text>
        <v-form @submit.prevent>
          <v-row>
            <v-col cols="6">
              <v-text-field
                label="Name"
                v-model="person.name"
                :rules="[(v) => !!v || 'Name is required']"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="Salary"
                v-model="person.salary"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-checkbox
                v-model="person.approved"
                label="Approved?"
              ></v-checkbox>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn @click="save()" color="primary"
          ><v-icon>mdi-content-save-outline</v-icon>Salvar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import Person from "../services/person";
import PersonModel from "../model/person";

export default {
  data() {
    return {
      people: [], // Inicialize o array vazio para armazenar os dados da API
      loading: false,
      person: new PersonModel({}),
    };
  },
  mounted() {
    this.list();
  },
  methods: {
    list() {
      try {
        this.loading = true;
        Person.list().then((res) => {
          this.people = res.data;
        });
      } catch (error) {
        alert("Nenhum dado foi encontrado!");
      } finally {
        this.loading = false;
      }
    },
    save() {
      if (!this.person.id) {
        Person.save(this.person)
          .then((res) => {
            this.person = new PersonModel({});
            alert("Record successfully added!");
            this.list();
          })
          .catch((e) => {
            alert(e.response.data.error);
          });
      } else {
        Person.update(this.person, this.person.id)
          .then((res) => {
            this.person = new PersonModel({});
            alert("Record successfully updated!");
            this.list();
          })
          .catch((e) => {
            alert(e.response.data.error);
          });
      }
    },

    edit(person) {
      this.person = person;
    },

    remove(person) {
      if (confirm("Deseja excluir o registro?")) {
        Person.delete(person, person.id)
          .then((res) => {
            this.list();
          })
          .catch((e) => {
            alert(e.response.data.error);
          });
      }
    },
  },
};
</script>
