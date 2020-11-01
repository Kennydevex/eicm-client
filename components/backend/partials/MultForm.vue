<template>
  <div>
    <Row :gutter="16" class="my-2">
      <Col span="24" class="mb-2" v-if="!(adding_contact || on_edit_contact)">
        <Button type="primary" @click="adding_contact = true">Adicionar</Button>
        <Button
          v-if="
            formData.contacts.length > 0 && !(adding_contact || on_edit_contact)
          "
          @click="clearAllContacts()"
          >Limpar todos</Button
        >
      </Col>
      <Col v-if="adding_contact || on_edit_contact" span="24" class="mb-2">
        <Form
          ref="contactForm"
          :model="temp_contacts"
          :rules="contactValidation"
        >
          <Row :gutter="16">
            <Col :span="temp_contacts.type == 1 ? 8 : 12">
              <FormItem
                prop="contact"
                :error="repeated_contact ? 'Contacto já introduzido' : ''"
              >
                <Input
                  @on-change="findRepeatedContact(temp_contacts.contact)"
                  v-model="temp_contacts.contact"
                >
                  <Select
                    v-model="temp_contacts.type"
                    slot="prepend"
                    style="width: 80px"
                  >
                    <Option value="1">Tel</Option>
                    <Option value="2">Email</Option>
                  </Select>
                </Input>
              </FormItem>
            </Col>
            <Col :span="temp_contacts.type == 1 ? 16 : 12">
              <FormItem>
                <Input
                  :autosize="true"
                  type="textarea"
                  v-model="temp_contacts.description"
                  placeholder="Descrição"
                >
                  <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
              </FormItem>
            </Col>
          </Row>
          <FormItem>
            <Button
              ghost
              :disabled="repeated_contact"
              type="primary"
              @click="
                on_edit_contact
                  ? updateContact('contactForm')
                  : adding_contact
                  ? addContact('contactForm')
                  : ''
              "
              >{{ on_edit_contact ? "Atualizar" : "Adicionar" }}</Button
            >

            <ButtonGroup>
              <Button
                @click="
                  on_edit_contact
                    ? cancelUpdateContact()
                    : adding_contact
                    ? cancelAddingContact()
                    : ''
                "
                >Cancelar</Button
              >
              <Button
                v-if="formData.contacts.length > 0"
                @click="clearAllContacts()"
                >Cancelar todos</Button
              >
            </ButtonGroup>
          </FormItem>
        </Form>
      </Col>
      <Col span="24" v-if="formData.contacts.length">
        <Table border :columns="contact_header" :data="contacts">
          <template slot-scope="{ row }" slot="type">
            <strong>{{ row.type == 1 ? "Tel" : "Email" }}</strong>
          </template>
          <template slot-scope="{ row, index }" slot="action">
            <Button
              type="primary"
              size="small"
              style="margin-right: 5px"
              @click.stop="onEditContact(index)"
              :disabled="on_edit_contact"
              ><Icon type="md-create"
            /></Button>
            <Button
              @click.stop="removeFormData(index, formData.contacts)"
              :disabled="on_edit_contact"
              type="error"
              size="small"
              ><Icon type="md-close"
            /></Button>
          </template>
        </Table>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
