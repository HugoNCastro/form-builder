'use client'

import { FormElementInstance } from "@/components/Form/FormElements";
import { CustomInstance, PropertiesFormSchemaType, propertiesSchema } from ".";
import { useDesigner } from "@/components/hooks/useDesigner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { PlusIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PropertiesComponent({
    elementInstance,
  }: {
    elementInstance: FormElementInstance;
  }) {
    const element = elementInstance as CustomInstance;
  
    const { updateElement, setSelectedElement } = useDesigner();
  
    const form = useForm<PropertiesFormSchemaType>({
      resolver: zodResolver(propertiesSchema),
      mode: "onSubmit",
      defaultValues: {
        label: element.extraAttributes.label,
        helperText: element.extraAttributes.helperText,
        required: element.extraAttributes.required,
        placeHolder: element.extraAttributes.placeholder,
        options: element.extraAttributes.options,
      },
    });
  
    useEffect(() => {
      form.reset(element.extraAttributes);
    }, [form, element]);
  
    function applyChanges(values: PropertiesFormSchemaType) {
      const { helperText, label, placeHolder, required, options } = values;
  
      updateElement(element.id, {
        ...element,
        extraAttributes: {
          label,
          helperText,
          required,
          placeHolder,
          options,
        },
      });
  
      toast({
        title: "Success",
        description: "Properties saved successfully",
      });
  
      setSelectedElement(null);
    }
  
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(applyChanges)} className="space-y-6">
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") e.currentTarget.blur();
                    }}
                  />
                </FormControl>
                <FormDescription>
                  The label of the field <br /> It will displayed above the field
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
  
          <FormField
            control={form.control}
            name="placeHolder"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PlaceHolder</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") e.currentTarget.blur();
                    }}
                  />
                </FormControl>
                <FormDescription>The placeholder of the field</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
  
          <FormField
            control={form.control}
            name="helperText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Helper text</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") e.currentTarget.blur();
                    }}
                  />
                </FormControl>
                <FormDescription>
                  The helper text of the field. <br /> It will be displayed below
                  the field.{" "}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
  
          <Separator />
  
          <FormField
            control={form.control}
            name="options"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel>Options</FormLabel>
                  <Button
                    variant={"outline"}
                    className="gap-2"
                    onClick={(e) => {
                      e.preventDefault(); //avoid submit
                      form.setValue("options", field.value.concat("New option"));
                    }}
                  >
                    <PlusIcon />
                    Add
                  </Button>
                </div>
                <div className="flex flex-col gap-2">
                  {form.watch("options").map((option, index) => {
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between gap-1"
                      >
                        <Input
                          placeholder=""
                          value={option}
                          onChange={(e) => {
                            field.value[index] = e.target.value;
                            field.onChange(field.value);
                          }}
                        />
                        <Button
                          variant={"ghost"}
                          className=""
                          size={"icon"}
                          onClick={(e) => {
                            e.preventDefault();
                            const newOptions = [...field.value];
                            newOptions.splice(index, 1);
                            field.onChange(newOptions);
                          }}
                        >
                          <X />
                        </Button>
                      </div>
                    );
                  })}
                </div>
  
                <FormDescription>
                  The helper text of the field. <br /> It will be displayed below
                  the field.{" "}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
  
          <Separator />
  
          <FormField
            control={form.control}
            name="required"
            render={({ field }) => (
              <FormItem className="flex items-center justify-center rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Required</FormLabel>
  
                  <FormDescription>
                    The helper text of the field. <br /> It will be displayed
                    below the field.{" "}
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator />
          <Button className="w-full" type="submit">
            Save
          </Button>
        </form>
      </Form>
    );
  }