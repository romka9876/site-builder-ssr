import { NgModule } from '@angular/core';
import { MetaLoader, MetaModule, MetaStaticLoader, PageTitlePositioning } from '@ngx-meta/core';

export function metaFactory(): MetaLoader {
  return new MetaStaticLoader({
    pageTitlePositioning: PageTitlePositioning.PrependPageTitle,
    pageTitleSeparator: ' | ',
    applicationName: 'App Universal',
    defaults: {
      title: 'Default page title',
      description: 'Default description',
      'og:site_name': 'App site Universal',
      'og:type': 'website'
    },
  });
}

@NgModule({
  imports: [
    MetaModule.forRoot({
      provide: MetaLoader,
      useFactory: metaFactory
    }),
  ],
})
export class SharedMetaModule {}
