"use client";

import { FC, useState } from "react";
import { Manufacturer } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AlertModal from "@/components/modals/alert-modal";

interface ManufacturerFormProps {
  initialData: Manufacturer | null;
}

const formSchema = z.object({
  name: z.string().min(1, {
    message: "O nome do fabricante é obrigatório.",
  }),
});

type ManufacturerFormValues = z.infer<typeof formSchema>;

const ManufacturerForm: FC<ManufacturerFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const router = useRouter();

  const title = initialData ? "Editar Fabricante" : "Criar Fabricante";
  const description = initialData
    ? "Edite um fabricante existente"
    : "Adicione um novo fabricante";
  const toastMessage = initialData
    ? "Fabricante atualizado."
    : "Fabricante criado.";
  const action = initialData ? "Salvar alterações" : "Criar";

  const form = useForm<ManufacturerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
    },
  });

  const onSubmit = async (data: ManufacturerFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/manufacturers/${params.manufacturerId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/manufacturers`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/manufacturers`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error(
        "Algo deu errado. Por favor, tente novamente mais tarde ou verifique suas informações."
      );
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/manufacturers/${params.manufacturerId}`
      );
      router.refresh();
      router.push(`/${params.storeId}/manufacturers`);
      toast.success("Fabricante deletado com sucesso.");
    } catch (error) {
      toast.error(
        "É necessário remover todos os produtos do fabricante para a sua exclusão."
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nome do fabricante"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
};

export default ManufacturerForm;
