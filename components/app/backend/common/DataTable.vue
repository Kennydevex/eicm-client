<template>
  <div class="p-3 border rounded-md shadow-lg ">
    <el-row :gutter="20">
      <el-col class="my-1" :xs="24" :sm="12" :md="16" :offset="0">
        <el-button
          @click.stop="onDelete(deleteEntity, '', updateEntity, true)"
          size="mini"
          plain
          type="danger"
          >Eliminar todos</el-button
        >
      </el-col>
      <el-col class="my-1" :xs="24" :sm="12" :md="8" :offset="0">
        <el-input
          suffix-icon="el-icon-search"
          v-model="search"
          size="mini"
          :placeholder="
            !searchTerm
              ? 'Selecione a coluna a procurar'
              : 'Procurar registo pelo...'
          "
        >
          <el-select
            autocomplete
            class="w-20"
            v-model="searchTerm"
            slot="prepend"
            placeholder="Selecionar"
          >
            <el-option
              class="capitalize"
              v-for="term in searchParams"
              :key="term.key"
              :label="term.name"
              :value="term.key"
            ></el-option>
          </el-select>
        </el-input>
      </el-col>
      <el-col :span="24" :offset="0" class="mt-3 border-t">
        <el-table
          ref="dataTable"
          style="width: 100%"
          height="350"
          :data="searchData"
          @row-contextmenu="handleContextMenu()"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <slot name="column_before"></slot>
          <el-table-column
            min-width="150"
            v-for="field in tableFields"
            :key="field.name"
            sortable
            :label="field.label"
            :prop="field.name"
            show-overflow-tooltip
          >
          </el-table-column>
          <slot name="column_after"></slot>
          <el-table-column
            align="center"
            header-align="center"
            width="200"
            label="Operações"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                plain
                :loading="sendingData[scope.row.id]"
                @click="handleEdit(scope.$index, scope.row)"
                >Editar</el-button
              >
              <el-button
                size="mini"
                type="danger"
                plain
                @click="handleDelete(scope.$index, scope.row)"
                >Eliminar</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { deleteDatas } from "@/mixins/appRequest";

export default {
  name: "DataTable",
  mixins: [deleteDatas],

  data() {
    return {
      search: "",
      searchTerm: "",
      selected: []
    };
  },

  props: {
    deleteEntity: {
      type: String,
      default: "",
      required: true
    },
    updateEntity: {
      type: String,
      default: "",
      required: true
    },
    dataSourse: {
      type: Array,
      default: () => {
        return [];
      },
      required: true
    },

    searchParams: {
      type: Array,
      default: () => {
        return [{ name: "Nome", key: "name" }];
      },
      required: false
    },

    tableFields: {
      type: Array,
      default: () => {
        return [];
      },
      required: true
    },

    sendingData: {
      type: Object,
      default: () => {
        return {};
      },
      required: false
    }
  },

  computed: {
    searchData() {
      if (!this.searchTerm) {
        return this.dataSourse;
      }
      let mthis = this;
      return this.dataSourse.filter(
        data =>
          !mthis.search ||
          data[this.searchTerm]
            .toLowerCase()
            .includes(mthis.search.toLowerCase())
      );
    }
  },

  methods: {
    handleContextMenu() {
      this.$emit("handleContextMenu", [i, row]);
    },
    handleEdit(i, row) {
      this.$emit("handleEdit", [i, row]);
    },
    handleDelete(i, row) {
      this.$emit("handleDelete", [i, row]);
    },

    handleSelectionChange(val) {
      this.selected = val;
    }
  }
};
</script>

<style lang="scss" scoped></style>
