-- Migrate value_setting: convert fixed contact fields to contacts[] array
UPDATE cad__resource
SET resource = (resource
  - 'facebook_label' - 'facebook_link'
  - 'line_label'    - 'line_link'
  - 'email_label'   - 'email_link'
  - 'tel_label'     - 'tel_link'
  || jsonb_build_object('contacts', jsonb_build_array(
      jsonb_build_object(
        'icon',  'facebook',
        'label', resource->>'facebook_label',
        'link',  resource->>'facebook_link'
      ),
      jsonb_build_object(
        'icon',  'line',
        'label', resource->>'line_label',
        'link',  resource->>'line_link'
      ),
      jsonb_build_object(
        'icon',  'email',
        'label', resource->>'email_label',
        'link',  resource->>'email_link'
      ),
      jsonb_build_object(
        'icon',  'tel',
        'label', resource->>'tel_label',
        'link',  resource->>'tel_link'
      )
    ))
)
WHERE resource_type = 'value_setting';
